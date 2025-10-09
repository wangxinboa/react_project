export default class File {
	constructor() {
		this.type = "file";
		this.isFile = true;

		this.parent = null;
	}

	initFile(file) {
		this.key = file.webkitRelativePath;
		this.name = file.name;

		this.file = file;

		this.suffix = this.name.substring(this.name.lastIndexOf("."));

		return this;
	}

	setParent(parent) {
		this.parent = parent;
	}

	toJSON() {
		return {
			type: "file",
			isFile: true,

			webkitRelativePath: this.key,
			name: this.name,
		};
	}
}
