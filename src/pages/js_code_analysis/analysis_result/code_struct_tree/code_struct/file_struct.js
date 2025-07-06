import BaseStruct from "./base_struct.js";

export default class FileStruct extends BaseStruct {
	constructor(filename, name) {
		super(filename);

		this.type = "File";
		this.name = name;

		this.body = [];
	}

	get children() {
		return this.body;
	}

	toJSON() {
		return { key: this.key, type: "File", name: this.name, body: this.body };
	}

	static fromJSON(jsonObject) {
		return new FileStruct(jsonObject.key, jsonObject.name);
	}
}
