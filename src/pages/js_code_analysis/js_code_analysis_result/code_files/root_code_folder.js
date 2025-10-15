import { RootFolder } from "../../../../utils/utils.js";
import { createCodeMessage } from "./code_file_code_message.js";
import CodeFolder from "./code_folder.js";
import CodeFile from "./code_file.js";

export default class RootCodeFolder extends RootFolder {
	selectable = false;
	codeFilesMap = {};

	destroy() {
		this.codeFilesMap = this.selectable = null;

		super.destroy();
	}

	onReadFile(file, fileResult) {
		file.setCodeMessage(createCodeMessage(fileResult));
		file.setCodeFilesMap(this.codeFilesMap);
	}
	toJSON() {
		return {
			allFiles: this.allFiles,
		};
	}

	static createFromJson(codeRootFolderJson) {
		const rootCodeFolder = new RootCodeFolder();

		for (let i = 0, len = codeRootFolderJson.allFiles.length; i < len; i++) {
			const codeFileJson = codeRootFolderJson.allFiles[i];

			rootCodeFolder
				.addFileByPath(codeFileJson.key, CodeFolder, CodeFile)
				.setCodeFilesMap(rootCodeFolder.codeFilesMap)
				.setCodeMessage(codeFileJson.codeMessage);
		}

		return rootCodeFolder;
	}
}
