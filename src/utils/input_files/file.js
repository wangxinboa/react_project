export default class File {
	constructor() {
		this.type = "file";
		this.isFile = true;

		this.parent = null;
	}

	destroy() {
		this.type = this.isFile = this.parent = this.file = this.key = this.name = this.suffix = null;
	}

	initFile(file) {
		this.file = file;
	}

	init(key, name) {
		this.key = key;
		this.name = name;

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
