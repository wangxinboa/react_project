import { File } from "../../../../utils/utils.js";

export default class CodeFile extends File {
	static setScroll(codeFile, v, h) {
		codeFile.vScroll = v;
		codeFile.hScroll = h;
	}
	static setRange(codeFile, range) {
		codeFile.range.start.row = range.start.row;
		codeFile.range.start.column = range.start.column;
		codeFile.range.end.row = range.end.row;
		codeFile.range.end.column = range.end.column;
	}

	toJSON() {
		return {
			key: this.key,
			name: this.name,
		};
	}
}
