import UsedCodeStruct from "./used_code_struct.js";
import getUsedCodeStructKey from "./code_struct_analysis_utils/get_used_code_struct_key.js";

export default class UsedCodeFileStruct {
	constructor(parent, codeFileStruct) {
		this.isUsedCodeFileStruct = true;

		this.codeFileStruct = codeFileStruct;
		this.key = getUsedCodeStructKey();
		this.id = codeFileStruct.key;
		this.name = codeFileStruct.baseKey;

		this.codeStructAnalysis = parent;

		this.parent = parent;

		this.children = [];
		this.usedCodeStructKeysMap = {};
	}

	hasUsedCodeStruct(codeStruct) {
		return codeStruct.key in this.usedCodeStructKeysMap;
	}
	addUsedCodeStruct(codeStruct) {
		if (this.hasUsedCodeStruct(codeStruct)) {
			return this.usedCodeStructKeysMap[codeStruct.key];
		} else {
			const usedCodeStruct = UsedCodeStruct.createFromCodeStruct(this, codeStruct);

			this.usedCodeStructKeysMap[codeStruct.key] = usedCodeStruct;
			this.children.push(usedCodeStruct);

			return usedCodeStruct;
		}
	}
	removeUsedCodeStruct(usedCodeStruct) {
		const index = this.children.indexOf(usedCodeStruct);
		if (index > -1) {
			this.children.splice(index, 1);
			delete this.usedCodeStructKeysMap[usedCodeStruct.key];
		}
	}

	static createFromCodeFileStruct(parent, codeFileStruct) {
		return new UsedCodeFileStruct(parent, codeFileStruct);
	}

	toJSON() {
		return {
			key: this.id,
			children: this.children,
		};
	}
}
