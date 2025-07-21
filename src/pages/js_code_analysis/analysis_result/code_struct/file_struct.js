import BaseStruct from "./base_struct.js";

export const FileStructType = "File";

export default class FileStruct extends BaseStruct {
	constructor(key, name, map) {
		super(key, null, map);

		this.type = FileStructType;
		this.name = name;
	}

	toJSON() {
		return { key: this.currentKey, type: FileStructType, name: this.name, children: this.children };
	}
}
