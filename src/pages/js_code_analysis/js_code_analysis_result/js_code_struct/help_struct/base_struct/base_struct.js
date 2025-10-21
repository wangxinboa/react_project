export default class BaseStruct {
	constructor(codeStructsMap) {
		/** @type {import('../file_struct/file_struct.js').default} */
		this.environmentStruct = null;
		/** @type {import('../file_struct/file_struct.js').default} */
		this.fileStruct = null;
		this.structPathSegments = null;

		this.parentRelation = "";

		this.children = [];
		this.parentStruct = null;

		this.codeStructsMap = codeStructsMap;

		this.title = "";
	}
	destroy() {
		this.removeSelf();
		this.key =
			this.environmentStruct =
			this.fileStruct =
			this.structPathSegments =
			this.children =
			this.parentStruct =
			// common
			this.type =
			this.title =
				null;
	}
	/** 传入 environmentStruct 初始化, environmentStruct 必须是 VariableMap */
	initByEnvironmentStruct(environmentStruct) {
		if (!environmentStruct.isScopeStruct) {
			console.error(
				"code struct",
				this,
				"执行 initByEnvironmentStruct, 根据 environmentStruct",
				environmentStruct,
				"初始化, 但 environmentStruct 不为 ScopeStruct, 数据类型有误"
			);
			throw new Error(
				"code struct 执行 initByEnvironmentStruct, 根据 environmentStruct 初始化, 但 environmentStruct 不为 ScopeStruct, 数据类型有误"
			);
		}
		this.environmentStruct = environmentStruct;
		this.fileStruct = environmentStruct.fileStruct;
		this.structPathSegments = [...this.environmentStruct.structPathSegments, this];

		return this;
	}
	// parentRelation 相关
	_setParentRelation(parentRelation) {
		this.parentRelation = parentRelation;

		this.afterSetParentRelation();
	}
	_clearParentRelation() {
		this.parentRelation = "";
	}
	afterSetParentRelation() {}
	afterAddChildrenCodeStructs() {}

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
		struct._clearParentRelation();

		return this;
	}
	addChildStruct(struct, parentRelation) {
		if (struct.parentStruct) {
			console.warn("该 code struct 已经存在 parentStruct 了", struct);
			struct.parentStruct.removeChildStruct(struct);
		}
		this.children.push(struct);
		struct.parentStruct = this;

		struct._setParentRelation(parentRelation);

		return this;
	}

	getValue() {
		console.error("code struct", this, "执行 getValue, 但是 code struct 未声明, 只有基类的 getValue, 待完善");
		throw new Error("code struct 执行 getValue, 但是 code struct 未声明, 只有基类的 getValue, 待完善");
	}
}
