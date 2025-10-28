import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class FunctionExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (isIdentifierAst(ast.id)) {
			this.title = getIdentifierName(ast.id);
		} else if (ast.id !== null) {
			console.error(
				"初始化 FunctionExpressionStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 FunctionExpressionStruct, 但是 ast.id 不是 IdentifierAst 也不是 null, 数据类型有误"
			);
			throw new Error(
				"初始化 FunctionExpressionStruct 根据 ast, 环境结构 environmentStruct 创建 FunctionExpressionStruct, 但是 ast.id 不是 IdentifierAst 也不是 null, 数据类型有误"
			);
		}

		this.type = "ArrowFunction";

		this.generator = ast.generator;
		this.async = ast.async;
	}
	destroy() {
		super.destroy();

		this.generator = this.async = null;
	}
}
