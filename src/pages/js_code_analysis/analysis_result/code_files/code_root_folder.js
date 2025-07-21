import { RootFolder } from "../../../../utils/utils.js";

export default class CodeRootFolder extends RootFolder {
	constructor() {
		super();
		this.codeFilesMap = {};
	}

	onReadFile(file, fileResult) {
		this.codeFilesMap[file.key] = {
			key: file.key,
			name: file.name,

			code: fileResult,

			vScroll: 0,
			hScroll: 0,

			range: {
				start: {
					row: 0,
					column: 0,
				},
				end: {
					row: 0,
					column: 0,
				},
			},
		};
	}
	toJSON() {
		return {
			key: this.key,
			name: this.name,
			children: this.children,
		};
	}
}
