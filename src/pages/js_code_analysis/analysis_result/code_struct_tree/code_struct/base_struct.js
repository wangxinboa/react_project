export default class BaseStruct {
	constructor(key, parent) {
		this.key = key;
		this.keysPath = parent === void 0 ? [key] : [...parent.keysPath, key];
	}

	getChildrenOptions() {
		return [];
	}

	get children() {
		return [];
	}

	toJSON() {}

	fromJSON() {}
}
