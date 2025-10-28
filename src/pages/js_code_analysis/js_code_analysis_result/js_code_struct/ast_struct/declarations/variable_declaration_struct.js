import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class VariableDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isVariableDeclarationStruct = true;
		this.kind = ast.kind;

		this.type = "VariableDeclaration";
		this.title = `${this.kind}`;
	}

	destroy() {
		super.destroy();

		this.isVariableDeclarationStruct = this.kind = null;
	}
}
