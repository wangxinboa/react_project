import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../../js_code_struct_utils/get_ast_attribute_value.js";

export default class ContinueStatementStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (isIdentifierAst(ast.label)) {
			this.label = getIdentifierName(ast.label);
			this.title = this.label;
		} else if (ast.label !== null) {
			console.error(
				"初始化 ContinueStatementStruct, 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ContinueStatementStruct 时, 根据属性 ast.label",
				ast.label,
				"获取标签名, 但是 ast.label 不是 IdentifierAst 也不是 null, 数据类型有误"
			);
			throw new Error(
				"初始化 ContinueStatementStruct, 根据 ast, 环境结构 environmentStruct 创建 ContinueStatementStruct 时, 根据属性 ast.label 获取标签名, 但是 ast.label 不是 IdentifierAst 也不是 null, 数据类型有误"
			);
		}

		this.type = "ContinueStatement";
	}
	destroy() {
		super.destroy();

		this.label = null;
	}
}
