// src/service/service_project_manager.js

import { dbManager } from "../utils/indexeddb/indexed_db_manager.js";

/** 数据库名称 */
const DB_NAME = "ProjectManagerDB";
/** 数据库版本 */
const DB_VERSION = 1;
/** 对象存储名称 */
const STORES = {
	projects: "projects",
	requirements: "requirements",
};

// 初始化数据库（不阻塞模块导出）
dbManager.init(DB_NAME, DB_VERSION, [
	{ name: STORES.projects, keyPath: "id" },
	{ name: STORES.requirements, keyPath: "id" },
]);

/**
 * 项目表单字段名称常量
 * @readonly
 * @enum {string}
 */
export const ProjectFormItemNames = Object.freeze({
	name: "name",
	gitUrl: "gitUrl",
	o2Url: "o2Url",
	comment: "comment",
});

/**
 * 项目表单字段标签常量
 * @readonly
 * @enum {string}
 */
export const ProjectFormItemLabels = Object.freeze({
	name: "项目名称",
	gitUrl: "仓库地址",
	o2Url: "o2 地址",
	comment: "注释说明",
});

/**
 * 需求表单字段名称常量
 * @readonly
 * @enum {string}
 */
export const RequirementFormItemNames = Object.freeze({
	name: "name",
	projectIds: "projectIds",
	aoneUrl: "aoneUrl",
	prdUrl: "prdUrl",
	designUrl: "designUrl",
	testUrl: "testUrl",
	crUrl: "crUrl",
	iterationUrl: "iterationUrl",
	devTime: "devTime",
	testTime: "testTime",
	onlineTime: "onlineTime",
	comment: "comment",
	status: "status",
});

/**
 * 需求表单字段标签常量
 * @readonly
 * @enum {string}
 */
export const RequirementFormItemLabels = Object.freeze({
	name: "需求名称",
	projectIds: "关联项目",
	aoneUrl: "Aone 地址",
	prdUrl: "PRD 地址",
	designUrl: "设计稿地址",
	testUrl: "效果测试地址",
	crUrl: "代码 CR 地址",
	iterationUrl: "迭代地址",
	devTime: "开发时间",
	testTime: "提测时间",
	onlineTime: "上线时间",
	comment: "注释说明",
	status: "状态",
});

/**
 * 需求状态枚举
 * @readonly
 * @enum {string}
 */
export const RequirementStatusEnum = Object.freeze({
	pending: "待开发",
	developing: "正在开发",
	debugging: "正在联调",
	testing: "正在测试",
	online: "已上线",
});

// ---------- 辅助数据库操作 ----------

/**
 * 获取下一个可用 ID（基于当前最大 ID + 1）
 * @param {string} storeName
 * @returns {Promise<number>}
 */
function getNextId(storeName) {
	return dbManager.getMaxId(storeName).then((maxId) => maxId + 1);
}

/**
 * 更新所有需求中对特定项目的引用（添加或移除需求ID）
 * @param {number} requirementId - 需求 ID
 * @param {number[]} projectIds - 关联的项目 ID 数组
 * @param {'add'|'remove'} operation - 操作类型
 * @returns {Promise<void>}
 */
function updateProjectRequirementIds(requirementId, projectIds, operation) {
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

// ---------- 项目 CRUD ----------

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
	// 先从需求中移除该项目引用
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

// ---------- 需求 CRUD ----------

/**
 * 获取所有需求列表（不分页）
 * @returns {Promise<{data: Array, total: number}>}
 */
export function serviceGetRequirementList() {
	return dbManager.getAll(STORES.requirements).then((data) => ({
		data,
		total: data.length,
	}));
}

/**
 * 分页获取需求列表
 * @param {number} page - 当前页码（从1开始）
 * @param {number} pageSize - 每页条数
 * @returns {Promise<{data: Array, total: number}>}
 */
export function serviceGetRequirementListPage(page, pageSize) {
	return dbManager.getAll(STORES.requirements).then((allRequirements) => {
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

/**
 * 新增需求
 * @param {Object} record - 需求数据（不含 id）
 * @param {string} record.name - 需求名称
 * @param {number[]} [record.projectIds] - 关联的项目 ID 数组
 * @param {string} [record.aoneUrl] - Aone 地址
 * @param {string} [record.prdUrl] - PRD 地址
 * @param {string} [record.designUrl] - 设计稿地址
 * @param {string} [record.testUrl] - 效果测试地址
 * @param {string} [record.crUrl] - 代码 CR 地址
 * @param {string} [record.iterationUrl] - 迭代地址
 * @param {string} record.devTime - 开发时间
 * @param {string} record.testTime - 提测时间
 * @param {string} record.onlineTime - 上线时间
 * @param {string} [record.comment] - 注释说明
 * @param {string} [record.status] - 状态（默认待开发）
 * @returns {Promise<{success: boolean}>}
 */
export function serviceAddRequirement(record) {
	return getNextId(STORES.requirements).then((id) => {
		record.id = id;
		if (!record.projectIds) {
			record.projectIds = [];
		}
		record.createTime = new Date().toISOString();
		if (!record.status) {
			record.status = RequirementStatusEnum.pending;
		}
		return dbManager.add(STORES.requirements, record).then(() => {
			return updateProjectRequirementIds(record.id, record.projectIds, "add").then(() => ({ success: true }));
		});
	});
}

/**
 * 更新需求
 * @param {number} id - 需求 ID
 * @param {Object} record - 要更新的字段（与新增相同）
 * @returns {Promise<{success: boolean}>}
 */
export function serviceUpdateRequirement(id, record) {
	return dbManager.getAll(STORES.requirements).then((requirements) => {
		let target = null;
		for (let i = 0; i < requirements.length; i++) {
			if (requirements[i].id === id) {
				target = requirements[i];
				break;
			}
		}
		if (!target) {
			return Promise.reject(new Error("需求不存在"));
		}
		// 先移除旧的项目关联
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
			target.comment = record.comment;
			target.status = record.status || RequirementStatusEnum.pending;
			return dbManager.put(STORES.requirements, target).then(() => {
				return updateProjectRequirementIds(id, target.projectIds, "add").then(() => ({ success: true }));
			});
		});
	});
}

/**
 * 删除需求（同时从项目中移除该需求引用）
 * @param {number} id - 需求 ID
 * @returns {Promise<{success: boolean}>}
 */
export function serviceDeleteRequirement(id) {
	return dbManager.getAll(STORES.requirements).then((requirements) => {
		let target = null;
		for (let i = 0; i < requirements.length; i++) {
			if (requirements[i].id === id) {
				target = requirements[i];
				break;
			}
		}
		if (!target) {
			return Promise.reject(new Error("需求不存在"));
		}
		return updateProjectRequirementIds(id, target.projectIds || [], "remove").then(() => {
			return dbManager.delete(STORES.requirements, id).then(() => ({ success: true }));
		});
	});
}

// ---------- 批量操作 ----------

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
			// 确保有 id 字段，如果没有则由新增方法自动生成，这里直接使用原 id
			if (project.id === undefined || project.id === null) {
				// 分配临时 id，但可能冲突，简单处理：直接添加，由调用方保证 id 存在
			}
			if (!project.requirementIds) {
				project.requirementIds = [];
			}
			addPromises.push(dbManager.add(STORES.projects, project));
		}
		return Promise.all(addPromises).then(() => ({ success: true }));
	});
}
