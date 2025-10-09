import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class RestElementStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (!isIdentifierAst(ast.argument)) {
			console.error(
				"根据 ast",
				ast,
				"environmentStruct",
				environmentStruct,
				"初始化 RestElementStruct, 但是 ast.argument",
				ast.argument,
				"不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"根据 ast, environmentStruct 初始化 RestElementStruct, 但是 ast.argument 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.argument = getIdentifierName(ast.argument);

		this.type = "RestElementStruct";
		this.title = this.argument;
	}

	destroy() {
		super.destroy();

		this.argument = null;
	}
}
