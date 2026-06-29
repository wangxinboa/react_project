import { dbManager, getNextId } from "./project_manager_db.js";
import { Stores, RequirementStatusEnum } from "./project_manager_constants.js";
import { updateProjectRequirementIds } from "./project_service.js";

const PROJECT_MANAGER_BASE = "http://localhost:2998/api/project_manager";

const StatusPriority = Object.freeze({
	[RequirementStatusEnum.developing]: 1,
	[RequirementStatusEnum.debugging]: 2,
	[RequirementStatusEnum.testing]: 3,
	[RequirementStatusEnum.pending]: 4,
	[RequirementStatusEnum.online]: 5,
});

function compareByStatusPriority(a, b) {
	const pA = StatusPriority[a.status] || 99;
	const pB = StatusPriority[b.status] || 99;
	return pA - pB;
}

function syncToServer(method, url, body) {
	const options = {
		method,
		headers: { "Content-Type": "application/json" },
	};
	if (body) options.body = JSON.stringify(body);
	fetch(url, options).catch((err) => console.error("Server sync error:", err));
}

function fetchRequirementsFromServerAndStore() {
	return fetch(`${PROJECT_MANAGER_BASE}/requirements`)
		.then((res) => res.json())
		.then((json) => {
			if (!json.success) throw new Error("Server error");
			const requirements = json.data || [];
			return dbManager
				.clear(Stores.requirements)
				.then(() => {
					const addPromises = [];
					for (let i = 0; i < requirements.length; i++) {
						addPromises.push(dbManager.add(Stores.requirements, requirements[i]));
					}
					return Promise.all(addPromises);
				})
				.then(() => requirements);
		});
}

function ensureRequirementsInDB() {
	return dbManager.getAll(Stores.requirements).then((requirements) => {
		if (requirements.length > 0) return requirements;
		return fetchRequirementsFromServerAndStore();
	});
}

export function serviceGetRequirementList() {
	return ensureRequirementsInDB().then((data) => ({
		data,
		total: data.length,
	}));
}

export function serviceGetRequirementListPage(page, pageSize) {
	return ensureRequirementsInDB().then((allRequirements) => {
		allRequirements.sort(compareByStatusPriority);
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const data = [];
		for (let i = start; i < end && i < allRequirements.length; i++) {
			data.push(allRequirements[i]);
		}
		return {
			data,
			total: allRequirements.length,
		};
	});
}

export function serviceAddRequirement(record) {
	return getNextId(Stores.requirements).then((id) => {
		record.id = id;
		record.createTime = Date.now();
		if (!record.projectIds) record.projectIds = [];
		if (!record.status) record.status = RequirementStatusEnum.pending;
		return dbManager.add(Stores.requirements, record).then(() => {
			return updateProjectRequirementIds(record.id, record.projectIds, "add").then(() => {
				syncToServer("POST", `${PROJECT_MANAGER_BASE}/requirements`, record);
				return { success: true };
			});
		});
	});
}

export function serviceUpdateRequirement(id, record) {
	return dbManager.getAll(Stores.requirements).then((requirements) => {
		let target = null;
		for (let i = 0; i < requirements.length; i++) {
			if (requirements[i].id === id) {
				target = requirements[i];
				break;
			}
		}
		if (!target) return Promise.reject(new Error("需求不存在"));
		return updateProjectRequirementIds(id, target.projectIds || [], "remove").then(() => {
			target.name = record.name;
			target.projectIds = record.projectIds || [];
			target.aoneUrl = record.aoneUrl;
			target.prdUrl = record.prdUrl;
			target.designUrl = record.designUrl;
			target.testUrl = record.testUrl;
			target.crUrl = record.crUrl;
			target.iterationUrl = record.iterationUrl;
			target.devTime = record.devTime;
			target.testTime = record.testTime;
			target.onlineTime = record.onlineTime;
			target.status = record.status || RequirementStatusEnum.pending;
			return dbManager.put(Stores.requirements, target).then(() => {
				return updateProjectRequirementIds(id, target.projectIds, "add").then(() => {
					syncToServer("PUT", `${PROJECT_MANAGER_BASE}/requirements/${id}`, target);
					return { success: true };
				});
			});
		});
	});
}

export function serviceDeleteRequirement(id) {
	return dbManager.getAll(Stores.requirements).then((requirements) => {
		let target = null;
		for (let i = 0; i < requirements.length; i++) {
			if (requirements[i].id === id) {
				target = requirements[i];
				break;
			}
		}
		if (!target) return Promise.reject(new Error("需求不存在"));
		return updateProjectRequirementIds(id, target.projectIds || [], "remove").then(() => {
			return dbManager.delete(Stores.requirements, id).then(() => {
				syncToServer("DELETE", `${PROJECT_MANAGER_BASE}/requirements/${id}`);
				return { success: true };
			});
		});
	});
}

export function serviceImportRequirements(requirementList) {
	return dbManager.clear(Stores.requirements).then(() => {
		const addPromises = [];
		for (let i = 0; i < requirementList.length; i++) {
			const req = requirementList[i];
			if (!req.projectIds) req.projectIds = [];
			if (!req.createTime) req.createTime = Date.now();
			addPromises.push(dbManager.add(Stores.requirements, req));
		}
		return Promise.all(addPromises).then(() => {
			const relinkPromises = [];
			for (let i = 0; i < requirementList.length; i++) {
				const req = requirementList[i];
				if (req.projectIds.length > 0) {
					relinkPromises.push(updateProjectRequirementIds(req.id, req.projectIds, "add"));
				}
			}
			return Promise.all(relinkPromises).then(() => {
				syncToServer("POST", `${PROJECT_MANAGER_BASE}/import`, { requirements: requirementList });
				return { success: true };
			});
		});
	});
}
