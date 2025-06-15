export default class File {
	constructor(file) {

		this.type = "file";
		this.isFile = true;

		this.key = file.webkitRelativePath;
		this.name = file.name;
		this.file = file;
		this.suffix = this.name.substring(this.name.lastIndexOf("."));

		this.readResult = null;
	}

	hasReadResult() {

		return this.readResult !== null;
	};

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