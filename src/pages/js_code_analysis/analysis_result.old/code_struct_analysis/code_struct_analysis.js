import UsedCodeFileStruct from "./used_code_file_struct.js";
import UseCodeFileStruct from "./use_code_file_struct.js";

export default class CodeStructAnalysis {
	constructor(codeStruct, analysisMap) {
		this.key = codeStruct.key;
		this.name = codeStruct.key;

		this.codeStruct = codeStruct;

		this.isCodeStructAnalysis = true;

		this.map = analysisMap;
		if (this.map[codeStruct.key] !== void 0) {
			throw new Error("analysisMap 中已经存在相同 codeStruct key 的 CodeStructAnalysis");
		}
		this.map[codeStruct.key] = this;

		this.usedCodeFileStructs = [];
		this.usedCodeFileStructsMap = {};

		this.useCodeFileStructs = [];
		this.useCodeFileStructsMap = {};
	}

	get children() {
		return this.usedCodeFileStructs;
	}

	hasUseCodeFileStruct(codeFileStruct) {
		return codeFileStruct.key in this.useCodeFileStructsMap;
	}
	addUseCodeStruct(codeStruct) {
		if (codeStruct?.isFileStruct) {
			return this.addUseCodeFileStruct(codeStruct);
		} else {
			const usedCodeFileStruct = this.addUseCodeFileStruct(codeStruct.fileStruct);
			return usedCodeFileStruct.addUseCodeStruct(codeStruct);
		}
	}
	addUseCodeFileStruct(codeFileStruct) {
		if (this.hasUseCodeFileStruct(codeFileStruct)) {
			return this.useCodeFileStructsMap[codeFileStruct.key];
		} else {
			const usedCodeFileStruct = UseCodeFileStruct.createFromCodeFileStruct(this, codeFileStruct);

			this.useCodeFileStructsMap[codeFileStruct.key] = usedCodeFileStruct;
			this.useCodeFileStructs.push(usedCodeFileStruct);

			return usedCodeFileStruct;
		}
	}

	addUsedCodeStructFromCodeStructKeys(codeStructKeys, codeStructsMap) {
		for (let i = 0, len = codeStructKeys.length; i < len; i++) {
			this.addUsedCodeStruct(codeStructsMap[codeStructKeys[i]]);
		}
	}
	addUsedCodeStruct(codeStruct) {
		this.createFromCodeStruct(codeStruct).addUseCodeStruct(this.codeStruct);

		if (codeStruct?.isFileStruct) {
			return this.addUsedCodeFileStruct(codeStruct);
		} else {
			const usedCodeFileStruct = this.addUsedCodeFileStruct(codeStruct.fileStruct);
			return usedCodeFileStruct.addUsedCodeStruct(codeStruct);
		}
	}
	hasUsedCodeFileStruct(codeFileStruct) {
		return codeFileStruct.key in this.usedCodeFileStructsMap;
	}
	addUsedCodeFileStruct(codeFileStruct) {
		if (this.hasUsedCodeFileStruct(codeFileStruct)) {
			return this.usedCodeFileStructsMap[codeFileStruct.key];
		} else {
			const usedCodeFileStruct = UsedCodeFileStruct.createFromCodeFileStruct(this, codeFileStruct);

			this.usedCodeFileStructsMap[codeFileStruct.key] = usedCodeFileStruct;
			this.usedCodeFileStructs.push(usedCodeFileStruct);

			return usedCodeFileStruct;
		}
	}

	createFromCodeStruct(codeStruct) {
		let codeStructAnalysis = this.map[codeStruct.key];
		if (!codeStructAnalysis) {
			codeStructAnalysis = CodeStructAnalysis.createFromCodeStruct(codeStruct, this.map);
		}
		return codeStructAnalysis;
	}

	static createFromCodeStruct(codeStruct, analysisMap) {
		return new CodeStructAnalysis(codeStruct, analysisMap);
	}

	toJSON() {
		return {
			key: this.key,
			usedCodeFileStructs: this.usedCodeFileStructs,
		};
	}
}
