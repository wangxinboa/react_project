import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class FunctionDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (!isIdentifierAst(ast.id)) {
			console.error(
				"初始化 FunctionDeclaration 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 FunctionDeclaration 时, 根据属性 ast.id",
				ast.id,
				"获取函数名, 但是 ast.id 不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"初始化 FunctionDeclaration 根据 ast, 环境结构 environmentStruct 创建 FunctionDeclaration 时, 根据属性 ast.id 获取函数名, 但是 ast.id 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.id = getIdentifierName(ast.id);
		this.generator = ast.generator;
		this.async = ast.async;

		this.type = "FunctionDeclaration";
		this.title = this.id;
	}
	destroy() {
		super.destroy();

		this.id = this.generator = this.async = null;
	}
}
