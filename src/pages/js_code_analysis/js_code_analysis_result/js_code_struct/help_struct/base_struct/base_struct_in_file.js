import getCodeStructKey from "../../js_code_struct_utils/get_code_struct_key.js";
import BaseStruct from "./base_struct.js";

export default class BaseStructInFile extends BaseStruct {
	constructor(ast, environmentStruct) {
		super(environmentStruct.codeStructsMap);
		this.initByEnvironmentStruct(environmentStruct);

		this.key = getCodeStructKey();
		this.codeStructsMap[this.key] = this;

		this.ast = ast;
	}
	destroy() {
		super.destroy();

		this.ast = null;
	}
}
