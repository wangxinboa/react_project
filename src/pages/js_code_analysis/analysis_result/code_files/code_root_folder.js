import { RootFolder } from "../../../../utils/utils.js";
import { createAceMessage } from "./code_file_ace_message.js";

export default class CodeRootFolder extends RootFolder {
	selectable = false;

	codeFilesMap = {};

	onReadFile(file, fileResult) {
		this.codeFilesMap[file.key] = {
			key: file.key,
			name: file.name,
			aceMessage: createAceMessage(fileResult),
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
