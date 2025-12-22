import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class RegExpLiteralStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isRegExpLiteralStruct = true;
		this.pattern = ast.pattern;
		this.flags = ast.flags;

		this.type = "RegExpLiteral";
		this.title = this.value;
	}
	destroy() {
		super.destroy();

		this.isRegExpLiteralStruct = this.pattern = this.flags = null;
	}
}
