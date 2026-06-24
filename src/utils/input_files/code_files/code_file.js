import File from "../file.js";

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
		for (let i = 0, len = importParts.length; i < len; i++) {
			const part = importParts[i];
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
			title: this.title,
			codeMessage: this.codeMessage,
		};
	}
}
