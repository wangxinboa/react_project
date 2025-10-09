export default class BaseStruct {
	constructor(baseKey) {
		this.baseKey = baseKey;

		this.children = [];
		this.parentStruct = null;

		this.parentRelation = "";

		this.isBaseStruct = true;
	}
	/** 传入 codeStructsMap 初始化, this 必须是 FileStruct */
	initFileStruct(codeStructsMap) {
		if (!this.isFileStruct) {
			console.error("code struct", this, "执行 initFileStruct, 初始化 FileStruct, 但自身不为 FileStruct, 数据类型有误");
			throw new Error("code struct 执行 initFileStruct, 初始化 FileStruct, 但自身不为 FileStruct, 数据类型有误");
		}
		this.environmentStruct = null;
		this.codeStructsMap = codeStructsMap;

		this.fileStruct = this;

		this.keyPathSegments = [this.baseKey];
		this.key = this.keyPathSegments.join("-");
		this.structPathSegments = [this];

		this.addToCodeStructsMap();

		return this;
	}
	/** 传入 environmentStruct 初始化, environmentStruct 必须是 VariableMap */
	initByEnvironmentStruct(environmentStruct) {
		if (!environmentStruct.isVariableMap) {
			console.error(
				"code struct",
				this,
				"执行 initByEnvironmentStruct, 根据 environmentStruct",
				environmentStruct,
				"初始化, 但 environmentStruct 不为 VariableMap, 数据类型有误"
			);
			throw new Error(
				"code struct 执行 initByEnvironmentStruct, 根据 environmentStruct 初始化, 但 environmentStruct 不为 VariableMap, 数据类型有误"
			);
		}
		this.environmentStruct = environmentStruct;
		this.codeStructsMap = environmentStruct.codeStructsMap;

		this.fileStruct = environmentStruct.fileStruct;

		this.keyPathSegments = [...this.environmentStruct.keyPathSegments, this.baseKey];
		this.key = this.keyPathSegments.join("-");
		this.structPathSegments = this.environmentStruct.structPathSegments.concat([this]);

		this.addToCodeStructsMap();

		return this;
	}
	// codeStructsMap
	addToCodeStructsMap() {
		if (this.codeStructsMap[this.key] !== void 0) {
			console.error(
				"code struct",
				this,
				"执行 addToCodeStructsMap, 将自身添加到 this.codeStructsMap",
				this.codeStructsMap,
				"中, 属性为",
				this.key,
				"但是该属性不为空, 已存在对应的值",
				this.codeStructsMap[this.key]
			);
			throw new Error(
				"code struct 执行 addToCodeStructsMap, 将自身添加到 this.codeStructsMap 中, 但是该属性不为空, 已存在对应的值"
			);
		}
		this.codeStructsMap[this.key] = this;
	}
	removeFromCodeStructsMap() {
		delete this.codeStructsMap[this.key];
	}

	// children parent 相关
	removeSelf() {
		if (this.parentStruct) {
			this.parentStruct.removeChildStruct(this);
		}
		return this;
	}
	removeChildStruct(struct) {
		const _childIndex = this.children.indexOf(struct);
		if (_childIndex > -1) {
			this.children.splice(_childIndex, 1);
			struct.parentStruct = null;
		}
		struct.parentRelation = "";

		return this;
	}
	addChildStruct(struct, parentRelation = "") {
		if (struct.parentStruct) {
			console.warn("该 code struct 已经存在 parentStruct 了", struct);
			struct.parentStruct.removeChildStruct(struct);
		}
		this.children.push(struct);
		struct.parentStruct = this;

		struct.parentRelation = parentRelation;

		return this;
	}

	getValue() {
		console.error("code struct", this, "执行 getValue, 但是 code struct 未声明, 只有基类的 getValue, 待完善");
		throw new Error("code struct 执行 getValue, 但是 code struct 未声明, 只有基类的 getValue, 待完善");
	}

	destroy() {
		this.removeSelf();

		this.baseKey =
			this.children =
			this.parentStruct =
			this.environmentStruct =
			this.codeStructsMap =
			this.fileStruct =
			this.keyPathSegments =
			this.key =
			this.structPathSegments =
			this.type =
			this.title =
				null;
	}
}
