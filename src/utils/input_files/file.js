export default class File {
	constructor(file) {
		this.type = "file";
		this.isFile = true;

		this.key = file.webkitRelativePath;
		this.name = file.name;

		this.file = file;

		this.suffix = this.name.substring(this.name.lastIndexOf("."));
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
