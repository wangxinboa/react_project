import { dbManager, getNextId } from "./project_manager_db.js";
import { STORES } from "./project_manager_constants.js";

/**
 * 更新所有需求中对特定项目的引用（添加或移除需求ID）
 * @param {number} requirementId - 需求 ID
 * @param {number[]} projectIds - 关联的项目 ID 数组
 * @param {'add'|'remove'} operation - 操作类型
 * @returns {Promise<void>}
 */
export function updateProjectRequirementIds(requirementId, projectIds, operation) {
	return dbManager.getAll(STORES.projects).then((projects) => {
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
					updatePromises.push(dbManager.put(STORES.projects, proj));
					break;
				}
			}
		}
		return Promise.all(updatePromises);
	});
}

/**
 * 获取所有项目列表（不分页）
 * @returns {Promise<{data: Array, total: number}>}
 */
export function serviceGetProjectList() {
	return dbManager.getAll(STORES.projects).then((data) => ({
		data,
		total: data.length,
	}));
}

/**
 * 分页获取项目列表
 * @param {number} page - 当前页码（从1开始）
 * @param {number} pageSize - 每页条数
 * @returns {Promise<{data: Array, total: number}>}
 */
export function serviceGetProjectListPage(page, pageSize) {
	return dbManager.getAll(STORES.projects).then((allProjects) => {
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

/**
 * 新增项目
 * @param {Object} record - 项目数据（不含 id）
 * @param {string} record.name - 项目名称
 * @param {string} record.gitUrl - Git 仓库地址
 * @param {string} [record.o2Url] - O2 地址
 * @param {string} [record.comment] - 注释说明
 * @returns {Promise<{success: boolean}>}
 */
export function serviceAddProject(record) {
	return getNextId(STORES.projects).then((id) => {
		record.id = id;
		if (!record.requirementIds) {
			record.requirementIds = [];
		}
		return dbManager.add(STORES.projects, record).then(() => ({ success: true }));
	});
}

/**
 * 更新项目
 * @param {number} id - 项目 ID
 * @param {Object} record - 要更新的字段
 * @param {string} record.name - 项目名称
 * @param {string} record.gitUrl - Git 仓库地址
 * @param {string} [record.o2Url] - O2 地址
 * @param {string} [record.comment] - 注释说明
 * @returns {Promise<{success: boolean}>}
 */
export function serviceUpdateProject(id, record) {
	return dbManager.getAll(STORES.projects).then((projects) => {
		let target = null;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === id) {
				target = projects[i];
				break;
			}
		}
		if (!target) {
			return Promise.reject(new Error("项目不存在"));
		}
		target.name = record.name;
		target.gitUrl = record.gitUrl;
		target.o2Url = record.o2Url;
		target.comment = record.comment;
		return dbManager.put(STORES.projects, target).then(() => ({ success: true }));
	});
}

/**
 * 删除项目（同时解除所有需求对该项目的引用）
 * @param {number} id - 项目 ID
 * @returns {Promise<{success: boolean}>}
 */
export function serviceDeleteProject(id) {
	return dbManager
		.getAll(STORES.requirements)
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
					requirementUpdates.push(dbManager.put(STORES.requirements, req));
				}
			}
			return Promise.all(requirementUpdates);
		})
		.then(() => {
			return dbManager.delete(STORES.projects, id).then(() => ({ success: true }));
		});
}

/**
 * 获取全部项目（供导出使用）
 * @returns {Promise<Array>}
 */
export function serviceGetAllProjects() {
	return dbManager.getAll(STORES.projects);
}

/**
 * 导入项目数据（会清空现有项目）
 * @param {Array} projectList - 要导入的项目数组
 * @returns {Promise<{success: boolean}>}
 */
export function serviceImportProjects(projectList) {
	return dbManager.clear(STORES.projects).then(() => {
		const addPromises = [];
		for (let i = 0; i < projectList.length; i++) {
			const project = projectList[i];
			if (!project.requirementIds) {
				project.requirementIds = [];
			}
			addPromises.push(dbManager.add(STORES.projects, project));
		}
		return Promise.all(addPromises).then(() => ({ success: true }));
	});
}
