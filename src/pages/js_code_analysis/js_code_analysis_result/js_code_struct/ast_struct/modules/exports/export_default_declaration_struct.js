import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";

export default class ExportDefaultDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "ExportDefaultDeclaration";
	}

	afterAddChildrenCodeStructs() {
		if (this.children.length !== 1) {
			console.error(
				"ExportDefaultDeclarationStruct class 实例",
				this,
				"执行 afterSetParentRelation, this.children",
				this.children,
				"数组长度不为1, 数据情况有误"
			);
			throw new Error(
				"ExportDefaultDeclarationStruct class 实例执行 afterSetParentRelation, this.children 数组长度不为1, 数据情况有误"
			);
		}
	}
}
