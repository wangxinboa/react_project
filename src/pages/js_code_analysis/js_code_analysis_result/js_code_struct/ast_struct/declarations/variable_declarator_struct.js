import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

const VariableDeclaratorStructPropertyTypesEnum = {
	id: "id",
	init: "init",
};

export default class VariableDeclaratorStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "VariableDeclarator";

		this.isVariableDeclaratorStruct = true;
	}

	destroy() {
		super.destroy();

		this.isVariableDeclaratorStruct = this.id = this.init = null;
	}

	afterSetParentRelation() {
		if (!this.parentStruct.isVariableDeclarationStruct) {
			console.error(
				"VariableDeclaratorStruct class 实例",
				this,
				"执行 afterSetParentRelation, this.parentStruct",
				this.parentStruct,
				"不是 VariableDeclaratorStruct 数据类型有误"
			);
			throw new Error(
				"VariableDeclaratorStruct class 实例 执行 afterSetParentRelation, this.parentStruct 不是 VariableDeclaratorStruct 数据类型有误"
			);
		}
	}

	afterAddChildCodeStruct(childCodeStruct, parentRelation) {
		if (parentRelation === VariableDeclaratorStructPropertyTypesEnum.id) {
			this.id = childCodeStruct;
		} else if (parentRelation === VariableDeclaratorStructPropertyTypesEnum.init) {
			this.init = childCodeStruct;
		} else {
			console.error(
				"VariableDeclaratorStruct 实例",
				this,
				"执行 afterAddChildCodeStruct 时, parentRelation",
				parentRelation,
				"不为 id, init, 数据类型有误"
			);
			throw new Error(
				"VariableDeclaratorStruct 实例执行 afterAddChildCodeStruct 时, parentRelation 不为 id, init, 数据类型有误"
			);
		}
	}
}
