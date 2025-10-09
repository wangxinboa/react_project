import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class ClassMethodStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (!isIdentifierAst(ast.key)) {
			console.error(
				"初始化 ClassMethodStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ClassMethodStruct 时, 根据属性名 ast.key",
				ast.key,
				"获取对象属性名, 但是 ast.key 不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ClassMethodStruct 根据 ast, 环境结构 environmentStruct 创建 ClassMethodStruct 时, 根据属性名 ast.key 获取对象属性名, 但是 ast.key 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.classMethodKey = getIdentifierName(this.ast.key);

		this.computed = ast.computed;
		this.kind = ast.kind;

		if (ast.id !== null) {
			console.error(
				"初始化 ClassMethodStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ClassMethodStruct, 但是 ast.id 不是 null, 数据类型有误"
			);
			throw new Error(
				"初始化 ClassMethodStruct 根据 ast, 环境结构 environmentStruct 创建 ClassMethodStruct, 但是 ast.id 不是 null, 数据类型有误"
			);
		}
		this.generator = ast.generator;
		this.async = ast.async;

		this.type = "ClassMethod";
	}

	destroy() {
		super.destroy();

		this.classMethodKey = this.computed = this.kind = this.generator = this.async = this.type = null;
	}
}
