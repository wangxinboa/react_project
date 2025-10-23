import getCodeStructKey from "../../js_code_struct_utils/get_code_struct_key.js";
import BaseStruct from "./base_struct.js";

export default class BaseStructInFile extends BaseStruct {
	constructor(ast, environmentStruct) {
		super(environmentStruct.codeStructsMessage);
		this.initByEnvironmentStruct(environmentStruct);

		this.key = getCodeStructKey();
		this.ast = ast;

		this.codeStructsMessage.codeStructsMap[this.key] = this;
	}

	getCodeString() {
		return this.fileStruct.getCodeString().slice(this.ast.start, this.ast.end);
	}

	destroy() {
		delete this.codeStructsMessage.codeStructsMap[this.key];

		this.key = this.ast = null;

		super.destroy();
	}
}
