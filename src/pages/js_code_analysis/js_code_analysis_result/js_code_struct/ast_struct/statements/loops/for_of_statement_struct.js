import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";

export default class ForOfStatementStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "ForOfStatement";

		this.await = ast.await;
	}
	destroy() {
		super.destroy();

		this.await = null;
	}
}
