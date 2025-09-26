import getUsedCodeStructKey from "./code_struct_analysis_utils/get_used_code_struct_key.js";

export default class UsedCodeStruct {
	constructor(parent, usedCodeStruct) {
		this.isUsedCodeStruct = true;

		this.key = getUsedCodeStructKey();
		this.id = usedCodeStruct.key;
		this.name = usedCodeStruct.baseKey;

		this.parent = parent;
		this.codeStructAnalysis = parent.codeStructAnalysis;

		this.children = [];
	}

	removeFromParent() {
		this.parent.removeUsedCodeStruct(this);
	}
	addNextUsedCodeStructFromCodeStructKeys(codeStructKeys, codeStructsMap) {
		for (let i = 0, len = codeStructKeys.length; i < len; i++) {
			this.addNextUsedCodeStruct(codeStructsMap[codeStructKeys[i]]);
		}
	}
	addNextUsedCodeStruct(codeStruct) {
		const nextUsedCodeStruct = NextUsedCodeStruct.createFromCodeStruct(this, codeStruct);
		this.children.push(nextUsedCodeStruct);
		return nextUsedCodeStruct;
	}
	removeNextUsedCodeStruct(nextUsedCodeStruct) {
		const index = this.children.indexOf(nextUsedCodeStruct);
		if (index > -1) {
			this.children.splice(index, 1);
		}
	}

	static createFromCodeStruct(parent, codeStruct) {
		return new UsedCodeStruct(parent, codeStruct);
	}

	toJSON() {
		return {
			key: this.id,
			children: this.children,
		};
	}
}

export class NextUsedCodeStruct {
	constructor(parent, usedCodeStruct) {
		this.key = getUsedCodeStructKey();
		this.id = usedCodeStruct.key;
		this.name = usedCodeStruct.baseKey;

		this.parent = parent;
		this.codeStructAnalysis = parent.codeStructAnalysis;
	}
	removeFromParent() {
		this.parent.removeNextUsedCodeStruct(this);
	}

	static createFromCodeStruct(parent, codeStruct) {
		return new NextUsedCodeStruct(parent, codeStruct);
	}

	toJSON() {
		return {
			key: this.id,
		};
	}
}
