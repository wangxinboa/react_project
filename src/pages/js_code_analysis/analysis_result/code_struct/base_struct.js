let _childIndex_ = -1;

export default class BaseStruct {
	constructor(key, parent = null, map = {}) {
		this.currentKey = key;
		this.keysPath = parent === null ? [key] : [...parent.keysPath, key];
		this.key = this.keysPath.join("-");

		this.children = [];

		this.file = parent ? parent.file : this;

		this.parent = parent;

		this.map = map;
		this.map[this.key] = this;
	}

	addChild(struct) {
		this.children.push(struct);
		return this;
	}

	removeChild(struct) {
		_childIndex_ = this.children.indexOf(struct);
		if (_childIndex_ > -1) {
			this.children.splice(_childIndex_, 1);
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	toJSON() {}
}
