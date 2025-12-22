import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

const VariableDeclarationStructPropertyTypesEnum = {
	declarations: "declarations",
};

export default class VariableDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isVariableDeclarationStruct = true;
		this.kind = ast.kind;

		this.type = "VariableDeclaration";
		this.title = `${this.kind}`;
		this.declarations = [];
	}

	destroy() {
		super.destroy();

		this.isVariableDeclarationStruct = this.kind = this.declarations = null;
	}

	afterAddChildCodeStruct(childCodeStruct, parentRelation) {
		if (!childCodeStruct.isVariableDeclaratorStruct) {
			console.error(
				"VariableDeclarationStruct 实例",
				this,
				"执行 afterAddChildCodeStruct 时, childCodeStruct",
				childCodeStruct,
				"不为 VariableDeclaratorStruct, 数据类型有误"
			);
			throw new Error(
				"VariableDeclarationStruct 实例执行 afterAddChildCodeStruct 时, childCodeStruct 不为 VariableDeclaratorStruct, 数据类型有误"
			);
		}

		if (parentRelation === VariableDeclarationStructPropertyTypesEnum.declarations) {
			this.declarations.push(childCodeStruct);
		} else {
			console.error(
				"VariableDeclarationStruct 实例",
				this,
				"执行 afterAddChildCodeStruct 时, parentRelation",
				parentRelation,
				"不为 declarations, 数据类型有误"
			);
			throw new Error(
				"VariableDeclarationStruct 实例执行 afterAddChildCodeStruct 时, childCodeStruct 不为 declarations, 数据类型有误"
			);
		}
	}
}
