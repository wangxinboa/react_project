import BaseStruct from "./base_struct.js";

export default class FileStruct extends BaseStruct {
	constructor(filename) {
		super(filename);

		this.type = "File";
	}
}
