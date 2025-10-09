import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class ImportStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "Import";
	}
}
