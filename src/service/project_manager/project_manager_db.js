import { dbManager } from "../../utils/indexeddb/indexed_db_manager.js";
import { DB_NAME, DB_VERSION, STORES } from "./project_manager_constants.js";

/**
 * 初始化数据库（项目管理和需求管理共用）
 * @returns {Promise<IDBDatabase>}
 */
function initDB() {
	return dbManager.init(DB_NAME, DB_VERSION, [
		{ name: STORES.projects, keyPath: "id" },
		{ name: STORES.requirements, keyPath: "id" },
	]);
}

// 确保模块加载时初始化（单例，不会重复执行）
initDB();

/**
 * 获取下一个可用 ID（基于当前最大 ID + 1）
 * @param {string} storeName - 对象存储名称
 * @returns {Promise<number>}
 */
export function getNextId(storeName) {
	return dbManager.getMaxId(storeName).then((maxId) => maxId + 1);
}

export { dbManager };
