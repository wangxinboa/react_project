export default class CacheMap {
	constructor() {
		this.cacheArray = [];
		this.cacheObject = {};
	}
	destroy() {
		this.cacheArray = this.cacheObject = null;
	}

	has(key) {
		return key in this.cacheObject;
	}
	get(key) {
		return this.cacheObject[key];
	}
	add(key, value) {
		// 判断是否存在就交给外面继承的类了
		this.cacheObject[key] = value;
		this.cacheArray.push(value);
	}
	replace(key, value) {
		this.remove(key);
		this.cacheObject[key] = value;
		this.cacheArray.push(value);
	}
	remove(key) {
		if (this.has(key)) {
			const _value = this.cacheObject[key];
			const _index = this.cacheArray.indexOf(_value);

			this.cacheArray.splice(_index, 1);
			delete this.cacheObject[key];
		}
	}
}
