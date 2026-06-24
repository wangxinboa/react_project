export default class File {
	constructor() {
		this.type = "file";
		this.isFile = true;
		this.parent = null;
	}

	destroy() {
		this.type = this.isFile = this.parent = this.file = this.key = this.title = this.suffix = null;
	}

	initFile(file) {
		this.file = file;
	}

	init(key, title) {
		this.key = key;
		this.title = title;
		this.suffix = this.title.substring(this.title.lastIndexOf("."));
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
			title: this.title,
		};
	}
}
