import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

const CallExpressionStructPropertyTypesEnum = {
	callee: "callee",
	arguments: "arguments",
};

export default class CallExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "CallExpression";

		this.isCallExpressionStruct = true;
		this._isAwait = null;

		this.arguments = [];
	}
	destroy() {
		super.destroy();

		this.isCallExpressionStruct = this._isAwait = this.callee = this.arguments = null;
	}

	isImport() {
		return this.arguments.length === 1 && this.arguments[0].isStringLiteralStruct;
	}

	isAwait() {
		if (this._isAwait !== null) {
			return this._isAwait;
		}

		let parentStruct = this.parentStruct,
			level = 1;

		while (parentStruct !== null) {
			if (parentStruct.isCallExpressionStruct || parentStruct.isNewExpressionStruct) {
				return false;
			}
			if (parentStruct.isAwaitExpression) {
				if (level !== 1) {
					console.error(
						"CallExpressionStruct 实例",
						this,
						"执行 isAwait 父节点 parentStruct",
						parentStruct,
						"存在 AwaitExpression, 但是 level",
						level,
						"层级不为 1, 执行逻辑不在预料内"
					);
					throw new Error(
						"CallExpressionStruct 实例执行 isAwait 父节点 parentStruct 存在 AwaitExpression, 但是 level 层级不为 1, 执行逻辑不在预料内"
					);
				}

				this._isAwait = true;
				return true;
			}

			level++;
			parentStruct = parentStruct.parentStruct;
		}

		this._isAwait = false;
		return false;
	}

	afterSetParentRelation() {
		this.isAwait();
	}

	afterAddChildCodeStruct(childCodeStruct, parentRelation) {
		if (parentRelation === CallExpressionStructPropertyTypesEnum.callee) {
			this.callee = childCodeStruct;
		} else if (parentRelation === CallExpressionStructPropertyTypesEnum.arguments) {
			this.arguments.push(childCodeStruct);
		} else {
			console.error(
				"CallExpressionStruct 实例",
				this,
				"执行 afterAddChildCodeStruct 时, parentRelation",
				parentRelation,
				"不为 callee, arguments, 数据类型有误"
			);
			throw new Error(
				"CallExpressionStruct 实例执行 afterAddChildCodeStruct 时, parentRelation 不为 callee, arguments, 数据类型有误"
			);
		}
	}
}
