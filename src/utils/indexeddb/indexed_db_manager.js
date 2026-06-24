/**
 * IndexedDB 管理器
 * @class
 */
export class IndexedDBManager {
	constructor() {
		/** @type {IDBDatabase|null} */
		this.db = null;
		/** @type {Promise<IDBDatabase>|null} */
		this.readyPromise = null;
	}

	/**
	 * 初始化数据库
	 * @param {string} dbName - 数据库名称
	 * @param {number} version - 版本号
	 * @param {Array<{name: string, keyPath: string}>} storesConfig - 对象存储配置
	 * @returns {Promise<IDBDatabase>}
	 */
	init(dbName, version, storesConfig) {
		if (this.readyPromise) {
			return this.readyPromise;
		}
		this.readyPromise = new Promise((resolve, reject) => {
			const request = indexedDB.open(dbName, version);
			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				for (let i = 0; i < storesConfig.length; i++) {
					const storeConfig = storesConfig[i];
					if (!db.objectStoreNames.contains(storeConfig.name)) {
						db.createObjectStore(storeConfig.name, {
							keyPath: storeConfig.keyPath,
						});
					}
				}
			};
			request.onsuccess = (event) => {
				this.db = event.target.result;
				resolve(this.db);
			};
			request.onerror = (event) => {
				reject(event.target.error);
			};
		});
		return this.readyPromise;
	}

	/**
	 * 确保数据库已就绪，返回数据库实例
	 * @returns {Promise<IDBDatabase>}
	 */
	ensureDb() {
		if (!this.readyPromise) {
			return Promise.reject(new Error("Database not initialized"));
		}
		return this.readyPromise;
	}

	/**
	 * 获取对象存储，返回 Promise<IDBObjectStore>
	 * @param {string} storeName - 存储名称
	 * @param {IDBTransactionMode} mode - 事务模式
	 * @returns {Promise<IDBObjectStore>}
	 */
	getStore(storeName, mode = "readonly") {
		return this.ensureDb().then((db) => {
			const transaction = db.transaction(storeName, mode);
			return transaction.objectStore(storeName);
		});
	}

	/**
	 * 获取存储中所有记录
	 * @param {string} storeName
	 * @returns {Promise<Array>}
	 */
	getAll(storeName) {
		return this.getStore(storeName).then((store) => {
			return new Promise((resolve, reject) => {
				const request = store.getAll();
				request.onsuccess = () => resolve(request.result || []);
				request.onerror = () => reject(request.error);
			});
		});
	}

	/**
	 * 添加记录（记录必须包含 keyPath 字段）
	 * @param {string} storeName
	 * @param {Object} item
	 * @returns {Promise<void>}
	 */
	add(storeName, item) {
		return this.getStore(storeName, "readwrite").then((store) => {
			return new Promise((resolve, reject) => {
				const request = store.add(item);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		});
	}

	/**
	 * 更新记录
	 * @param {string} storeName
	 * @param {Object} item
	 * @returns {Promise<void>}
	 */
	put(storeName, item) {
		return this.getStore(storeName, "readwrite").then((store) => {
			return new Promise((resolve, reject) => {
				const request = store.put(item);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		});
	}

	/**
	 * 删除记录
	 * @param {string} storeName
	 * @param {number|string} id
	 * @returns {Promise<void>}
	 */
	delete(storeName, id) {
		return this.getStore(storeName, "readwrite").then((store) => {
			return new Promise((resolve, reject) => {
				const request = store.delete(id);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		});
	}

	/**
	 * 清空对象存储
	 * @param {string} storeName
	 * @returns {Promise<void>}
	 */
	clear(storeName) {
		return this.getStore(storeName, "readwrite").then((store) => {
			return new Promise((resolve, reject) => {
				const request = store.clear();
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		});
	}

	/**
	 * 获取存储中的最大 id 值
	 * @param {string} storeName
	 * @returns {Promise<number>}
	 */
	getMaxId(storeName) {
		return this.getAll(storeName).then((items) => {
			let maxId = 0;
			for (let i = 0; i < items.length; i++) {
				const id = items[i].id;
				if (typeof id === "number" && id > maxId) {
					maxId = id;
				}
			}
			return maxId;
		});
	}
}

/**
 * 全局单例
 * @type {IndexedDBManager}
 */
export const dbManager = new IndexedDBManager();
