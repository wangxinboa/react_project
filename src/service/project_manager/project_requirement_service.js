import { dbManager, getNextId } from "./project_manager_db.js";
import { Stores, RequirementStatusEnum } from "./project_manager_constants.js";
import { updateProjectRequirementIds } from "./project_service.js";

/**
 * 获取所有需求列表（不分页）
 * @returns {Promise<{data: Array, total: number}>}
 */
export function serviceGetRequirementList() {
	return dbManager.getAll(Stores.requirements).then((data) => ({
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
	return dbManager.getAll(Stores.requirements).then((allRequirements) => {
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
 * @param {number} record.devTime - 开发时间（时间戳）
 * @param {number} record.testTime - 提测时间（时间戳）
 * @param {number} record.onlineTime - 上线时间（时间戳）
 * @param {string} [record.comment] - 注释说明
 * @param {string} [record.status] - 状态（默认待开发）
 * @returns {Promise<{success: boolean}>}
 */
export function serviceAddRequirement(record) {
	return getNextId(Stores.requirements).then((id) => {
		record.id = id;
		record.createTime = Date.now();
		if (!record.projectIds) {
			record.projectIds = [];
		}
		if (!record.status) {
			record.status = RequirementStatusEnum.pending;
		}
		return dbManager.add(Stores.requirements, record).then(() => {
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
	return dbManager.getAll(Stores.requirements).then((requirements) => {
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
			return dbManager.put(Stores.requirements, target).then(() => {
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
	return dbManager.getAll(Stores.requirements).then((requirements) => {
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
			return dbManager.delete(Stores.requirements, id).then(() => ({ success: true }));
		});
	});
}

/**
 * 导入需求数据（清空现有需求后导入，并重建项目关联）
 * @param {Array} requirementList - 需求数组
 * @returns {Promise<{success: boolean}>}
 */
export function serviceImportRequirements(requirementList) {
	return dbManager.clear(Stores.requirements).then(() => {
		const addPromises = [];
		for (let i = 0; i < requirementList.length; i++) {
			const req = requirementList[i];
			if (!req.projectIds) {
				req.projectIds = [];
			}
			if (!req.createTime) {
				req.createTime = Date.now();
			}
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
			return Promise.all(relinkPromises).then(() => ({ success: true }));
		});
	});
}
