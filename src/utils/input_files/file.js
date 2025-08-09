export default class File {
	constructor(file) {
		this.type = "file";
		this.isFile = true;

		this.key = file.webkitRelativePath;
		this.name = file.name;

		this.file = file;

		this.suffix = this.name.substring(this.name.lastIndexOf("."));

		this._readed = false;
	}

	hasReadResult() {
		return this._readed;
	}
	readed() {
		this._readed = true;
	}

	toJSON() {
		return {
			type: "file",
			isFile: true,

			key: this.key,
			name: this.name,

			suffix: this.suffix,
		};
	}
}
