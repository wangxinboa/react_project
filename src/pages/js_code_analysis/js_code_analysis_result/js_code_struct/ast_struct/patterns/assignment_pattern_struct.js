import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class AssignmentPatternStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "AssignmentPattern";
		this.title = this.left;
	}

	destroy() {
		super.destroy();

		this.left = null;
	}
}
