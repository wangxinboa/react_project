import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class VariableDeclaratorStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "VariableDeclarator";
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
}
