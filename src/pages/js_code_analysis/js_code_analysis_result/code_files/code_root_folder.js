import { RootFolder } from "../../../../utils/utils.js";
import { createCodeMessage } from "./code_file_code_message.js";

export default class CodeRootFolder extends RootFolder {
	selectable = false;

	codeFilesMap = {};

	onReadFile(file, fileResult) {
		this.codeFilesMap[file.key] = {
			key: file.key,
			name: file.name,
			codeMessage: createCodeMessage(fileResult),
		};
	}
	toJSON() {
		return {
			selectable: false,
			key: this.key,
			name: this.name,
			children: this.children,
		};
	}
}
