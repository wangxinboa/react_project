import { File } from "../../../../utils/utils.js";

export default class CodeFile extends File {
	codeFilesMap = null;
	codeMessage = null;

	destroy() {
		this.codeFilesMap = this.codeMessage = null;

		super.destroy();
	}

	setCodeFilesMap(_codeFilesMap) {
		this.codeFilesMap = _codeFilesMap;
		this.codeFilesMap[this.key] = this;

		return this;
	}
	setCodeMessage(_codeMessage) {
		this.codeMessage = _codeMessage;

		return this;
	}

	getPathByRelative(relativePath) {
		const currentDir = this.key.split("/").slice(0, -1);
		const importParts = relativePath.split("/");

		for (const part of importParts) {
			if (part === ".") {
				continue;
			} else if (part === "..") {
				if (currentDir.length > 0) {
					currentDir.pop();
				}
			} else {
				currentDir.push(part);
			}
		}

		return currentDir.join("/");
	}

	getCodeFileByRelativePath(relativePath) {
		return this.getCodeFileByPath(this.getPathByRelative(relativePath)) ?? null;
	}
	getCodeFileByPath(path) {
		return this.codeFilesMap[path] ?? null;
	}

	toJSON() {
		return {
			isFile: true,
			key: this.key,
			name: this.name,

			codeMessage: this.codeMessage,
		};
	}
}
