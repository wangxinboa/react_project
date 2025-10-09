import BaseInEnvironmentStruct from "../base_struct/base_in_environment_struct.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";

export default class VariableDeclarationStruct extends BaseInEnvironmentStruct {
	static type = "VariableDeclaration";

	constructor(variableDeclarationAst, environmentStruct) {
		const _baseKey = `${VariableDeclarationStruct.type}_${getStructIndex()}:`;
		super(_baseKey, environmentStruct);

		this.type = VariableDeclarationStruct.type;

		this.ast = variableDeclarationAst;
	}

	destroy() {
		super.destroy();

		this.ast = null;
	}

	static createVariableDeclarationAst(variableDeclarationAst, environmentStruct) {
		return new VariableDeclarationStruct(variableDeclarationAst, environmentStruct);
	}
}
