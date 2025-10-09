import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class VariableDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "VariableDeclaration";
		this.title = `${ast.kind}`;

		this.kind = ast.kind;
	}

	destroy() {
		super.destroy();

		this.kind = null;
	}
}
