import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst, isStringLiteralAst } from "../../../js_code_struct_utils/ast_types.js";
import { getIdentifierName, getStringLiteralValue } from "../../../js_code_struct_utils/get_ast_attribute_value.js";

const ObjectMethodTypesEnum = {
	get: "get",
	set: "set",
	method: "method",
};

export default class ObjectMethodStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (isIdentifierAst(ast.key)) {
			this.objectKey = getIdentifierName(ast.key);
		} else if (isStringLiteralAst(ast.key)) {
			this.objectKey = getStringLiteralValue(ast.key);
		} else {
			console.error(
				"初始化 ObjectMethodStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ObjectMethodStruct 时, 根据属性 ast.key",
				ast.key,
				"获取对象属性名, 但是 ast.key 不是 IdentifierAst 也不是 StringLiteralAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ObjectMethodStruct 根据 ast, 环境结构 environmentStruct 创建 ObjectMethodStruct 时, 根据属性 ast.key 获取对象属性名, 但是 ast.key 不是 IdentifierAst 也不是 StringLiteralAst, 数据类型有误"
			);
		}
		if (ast.method !== true && ast.kind === ObjectMethodTypesEnum.method) {
			console.error(
				"初始化 ObjectMethodStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ObjectMethodStruct 时, 根据属性 ast.method",
				ast.method,
				"获取对象 method 属性, 但是 ast.kind",
				ast.kind,
				"是 method, 且 ast.method 不是 true 且数据类型有误"
			);
			throw new Error(
				"初始化 ObjectMethodStruct 根据 ast, 环境结构 environmentStruct 创建 ObjectMethodStruct 时, 根据属性 ast.method 获取对象 method 属性, 但是 ast.kind 是 method, 且 ast.method 不是 true 且数据类型有误"
			);
		}
		this.method = ast.method;
		this.computed = ast.computed;
		this.kind = ast.kind;
		this.generator = ast.generator;
		this.async = ast.async;

		this.type = "ObjectMethod";
		this.title = this.name;
	}
	destroy() {
		super.destroy();

		this.objectKey = this.method = this.computed = this.shorthand = this.kind = this.generator = this.async = null;
	}
}
