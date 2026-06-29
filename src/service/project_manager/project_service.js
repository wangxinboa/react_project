import { dbManager, getNextId } from "./project_manager_db.js";
import { Stores } from "./project_manager_constants.js";

const PROJECT_MANAGER_BASE = "http://localhost:2998/api/project_manager";

// ---------- 辅助函数 ----------
/**
 * 从 server 获取所有项目并写入 IndexedDB
 */
function fetchProjectsFromServerAndStore() {
	return fetch(`${PROJECT_MANAGER_BASE}/projects`)
		.then((res) => res.json())
		.then((json) => {
			if (!json.success) throw new Error("Server error");
			const projects = json.data || [];
			return dbManager
				.clear(Stores.projects)
				.then(() => {
					const addPromises = [];
					for (let i = 0; i < projects.length; i++) {
						addPromises.push(dbManager.add(Stores.projects, projects[i]));
					}
					return Promise.all(addPromises);
				})
				.then(() => projects);
		});
}

/**
 * 确保 IndexedDB 中有数据，若无则从 server 拉取
 * @returns {Promise<Array>} 全部项目数组
 */
function ensureProjectsInDB() {
	return dbManager.getAll(Stores.projects).then((projects) => {
		if (projects.length > 0) return projects;
		return fetchProjectsFromServerAndStore();
	});
}

// 同步 server 操作（fire-and-forget，仅 log 错误）
function syncToServer(method, url, body) {
	const options = {
		method,
		headers: { "Content-Type": "application/json" },
	};
	if (body) options.body = JSON.stringify(body);
	fetch(url, options).catch((err) => console.error("Server sync error:", err));
}

export function updateProjectRequirementIds(requirementId, projectIds, operation) {
	return dbManager.getAll(Stores.projects).then((projects) => {
		const updatePromises = [];
		for (let i = 0; i < projectIds.length; i++) {
			const projectId = projectIds[i];
			for (let j = 0; j < projects.length; j++) {
				if (projects[j].id === projectId) {
					const proj = projects[j];
					if (operation === "add") {
						let exists = false;
						if (!proj.requirementIds) {
							proj.requirementIds = [];
						}
						for (let k = 0; k < proj.requirementIds.length; k++) {
							if (proj.requirementIds[k] === requirementId) {
								exists = true;
								break;
							}
						}
						if (!exists) {
							proj.requirementIds.push(requirementId);
						}
					} else if (operation === "remove") {
						if (proj.requirementIds) {
							const newIds = [];
							for (let k = 0; k < proj.requirementIds.length; k++) {
								if (proj.requirementIds[k] !== requirementId) {
									newIds.push(proj.requirementIds[k]);
								}
							}
							proj.requirementIds = newIds;
						}
					}
					updatePromises.push(dbManager.put(Stores.projects, proj));
					break;
				}
			}
		}
		return Promise.all(updatePromises);
	});
}

function compareByRequirementCount(a, b) {
	const lenA = (a.requirementIds && a.requirementIds.length) || 0;
	const lenB = (b.requirementIds && b.requirementIds.length) || 0;
	return lenB - lenA;
}

export function serviceGetProjectList() {
	return ensureProjectsInDB().then((projects) => ({
		data: projects,
		total: projects.length,
	}));
}

export function serviceGetProjectListPage(page, pageSize) {
	return ensureProjectsInDB().then((allProjects) => {
		allProjects.sort(compareByRequirementCount);
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const data = [];
		for (let i = start; i < end && i < allProjects.length; i++) {
			data.push(allProjects[i]);
		}
		return {
			data,
			total: allProjects.length,
		};
	});
}

export function serviceAddProject(record) {
	return getNextId(Stores.projects).then((id) => {
		record.id = id;
		record.createTime = Date.now();
		if (!record.requirementIds) record.requirementIds = [];
		return dbManager.add(Stores.projects, record).then(() => {
			// 同步到 server
			syncToServer("POST", `${PROJECT_MANAGER_BASE}/projects`, record);
			return { success: true };
		});
	});
}

export function serviceUpdateProject(id, record) {
	return dbManager.getAll(Stores.projects).then((projects) => {
		let target = null;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === id) {
				target = projects[i];
				break;
			}
		}
		if (!target) return Promise.reject(new Error("项目不存在"));
		target.name = record.name;
		target.gitUrl = record.gitUrl;
		target.o2Url = record.o2Url;
		return dbManager.put(Stores.projects, target).then(() => {
			syncToServer("PUT", `${PROJECT_MANAGER_BASE}/projects/${id}`, {
				name: record.name,
				gitUrl: record.gitUrl,
				o2Url: record.o2Url,
			});
			return { success: true };
		});
	});
}

export function serviceDeleteProject(id) {
	return dbManager
		.getAll(Stores.requirements)
		.then((requirements) => {
			const requirementUpdates = [];
			for (let j = 0; j < requirements.length; j++) {
				const req = requirements[j];
				if (req.projectIds) {
					const newProjectIds = [];
					for (let k = 0; k < req.projectIds.length; k++) {
						if (req.projectIds[k] !== id) {
							newProjectIds.push(req.projectIds[k]);
						}
					}
					req.projectIds = newProjectIds;
					requirementUpdates.push(dbManager.put(Stores.requirements, req));
				}
			}
			return Promise.all(requirementUpdates);
		})
		.then(() => {
			return dbManager.delete(Stores.projects, id).then(() => {
				syncToServer("DELETE", `${PROJECT_MANAGER_BASE}/projects/${id}`);
				return { success: true };
			});
		});
}

export function serviceGetAllProjects() {
	return dbManager.getAll(Stores.projects);
}

export function serviceImportProjects(projectList) {
	return dbManager.clear(Stores.projects).then(() => {
		const addPromises = [];
		for (let i = 0; i < projectList.length; i++) {
			const project = projectList[i];
			if (!project.requirementIds) project.requirementIds = [];
			if (project.createTime === undefined || project.createTime === null) {
				project.createTime = Date.now();
			}
			addPromises.push(dbManager.add(Stores.projects, project));
		}
		return Promise.all(addPromises).then(() => {
			syncToServer("POST", `${PROJECT_MANAGER_BASE}/import`, { projects: projectList });
			return { success: true };
		});
	});
}
