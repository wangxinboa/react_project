let _childIndex_ = null;

export default class BaseStruct {
	constructor(baseKey, parent = null, codeStructsMap = {}) {
		this.baseKey = baseKey;
		this.keyPath = parent === null ? [baseKey] : [...parent.keyPath, baseKey];
		this.key = this.keyPath.join("-");

		this.structPath = parent ? parent.structPath.concat([this]) : [this];

		this.children = [];

		this.fileStruct = parent ? parent.fileStruct : this;

		this.parent = parent;

		this.map = codeStructsMap;
		if (this.map[this.key] !== void 0) {
			throw new Error("codeStructsMap 中已经存在相同 key 的 struct");
		}
		this.map[this.key] = this;
	}

	addChildStruct(struct) {
		this.children.push(struct);
		return this;
	}
	removeChild(struct) {
		_childIndex_ = this.children.indexOf(struct);
		if (_childIndex_ > -1) {
			this.children.splice(_childIndex_, 1);
		}
		delete this.map[struct.key];

		_childIndex_ = null;
	}
	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	getTitle() {
		return this.baseKey;
	}

	toJSON() {}
}
