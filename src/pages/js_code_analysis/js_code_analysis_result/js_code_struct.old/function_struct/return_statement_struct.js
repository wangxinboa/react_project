import BaseInEnvironmentStruct from "../base_struct/base_in_environment_struct.js";
import createCodeStructByAst from "../js_code_struct_utils/create_code_struct_by_ast.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";

export default class ReturnStatementStruct extends BaseInEnvironmentStruct {
	static type = "ReturnStatement";

	constructor(returnStatementAst, environmentStruct) {
		const _baseKey = `${ReturnStatementStruct.type}_${getStructIndex()}:`;
		super(_baseKey, environmentStruct);

		this.type = ReturnStatementStruct.type;

		this.ast = returnStatementAst;
		this.argumentStruct = null;

		this.initArgumentStruct();
	}

	destroy() {
		super.destroy();

		this.ast = this.argument = null;
	}

	initArgumentStruct() {
		this.argumentStruct = createCodeStructByAst(this.ast.argument, this.environmentStruct);
		this.addChildStruct(this.argumentStruct, "argument");
	}

	getValue() {
		return this.argumentStruct.getValue();
	}

	static createByReturnStatementAst(returnStatementAst, environmentStruct) {
		return new ReturnStatementStruct(returnStatementAst, environmentStruct);
	}
}
