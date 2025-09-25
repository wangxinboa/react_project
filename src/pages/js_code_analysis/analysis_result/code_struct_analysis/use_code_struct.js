import getUsedCodeStructKey from "./code_struct_analysis_utils/get_used_code_struct_key.js";

export default class UseCodeStruct {
	constructor(parent, useCodeStruct) {
		this.isUseCodeStruct = true;

		this.key = getUsedCodeStructKey();
		this.id = useCodeStruct.key;
		this.name = useCodeStruct.baseKey;

		this.parent = parent;
		this.codeStructAnalysis = parent.codeStructAnalysis;

		this.children = [];
	}

	removeFromParent() {
		this.parent.removeUseCodeStruct(this);
	}

	static createFromCodeStruct(parent, codeStruct) {
		return new UseCodeStruct(parent, codeStruct);
	}

	toJSON() {
		return {
			key: this.id,
			children: this.children,
		};
	}
}
