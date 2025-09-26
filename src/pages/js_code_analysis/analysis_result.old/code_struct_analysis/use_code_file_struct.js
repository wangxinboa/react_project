import getUsedCodeStructKey from "./code_struct_analysis_utils/get_used_code_struct_key.js";
import UseCodeStruct from "./use_code_struct.js";

export default class UseCodeFileStruct {
	constructor(parent, codeFileStruct) {
		this.isUseCodeFileStruct = true;

		this.codeFileStruct = codeFileStruct;
		this.key = getUsedCodeStructKey();
		this.id = codeFileStruct.key;
		this.name = codeFileStruct.baseKey;

		this.codeStructAnalysis = parent;

		this.parent = parent;

		this.children = [];
		this.useCodeStructKeysMap = {};
	}

	hasUseCodeStruct(codeStruct) {
		return codeStruct.key in this.useCodeStructKeysMap;
	}
	addUseCodeStruct(codeStruct) {
		if (this.hasUseCodeStruct(codeStruct)) {
			return this.useCodeStructKeysMap[codeStruct.key];
		} else {
			const useCodeStruct = UseCodeStruct.createFromCodeStruct(this, codeStruct);

			this.useCodeStructKeysMap[codeStruct.key] = useCodeStruct;
			this.children.push(useCodeStruct);

			return useCodeStruct;
		}
	}
	removeUseCodeStruct(useCodeStruct) {
		const index = this.children.indexOf(useCodeStruct);
		if (index > -1) {
			this.children.splice(index, 1);
			delete this.useCodeStructKeysMap[useCodeStruct.key];
		}
	}

	static createFromCodeFileStruct(parent, codeFileStruct) {
		return new UseCodeFileStruct(parent, codeFileStruct);
	}

	toJSON() {
		return {
			key: this.id,
			children: this.children,
		};
	}
}
