import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../../js_code_struct_utils/get_ast_attribute_value.js";

export default class ExportSpecifierStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (!isIdentifierAst(ast.local)) {
			console.error(
				"初始化 ExportSpecifierStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ExportSpecifierStruct 时, 根据属性名 ast.exported",
				ast.exported,
				"获取对象属性名, 但是 ast.exported 不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ExportSpecifierStruct 根据 ast, 环境结构 environmentStruct 创建 ExportSpecifierStruct 时, 根据属性名 ast.exported 获取对象属性名, 但是 ast.exported 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.exported = getIdentifierName(ast.exported);

		if (!isIdentifierAst(ast.local)) {
			console.error(
				"初始化 ExportSpecifierStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ExportSpecifierStruct 时, 根据属性名 ast.local",
				ast.local,
				"获取对象属性名, 但是 ast.local 不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ExportSpecifierStruct 根据 ast, 环境结构 environmentStruct 创建 ExportSpecifierStruct 时, 根据属性名 ast.local 获取对象属性名, 但是 ast.local 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.local = getIdentifierName(ast.local);

		this.type = "ExportSpecifier";
		if (this.local === this.exported) {
			this.title = `export ${this.local}`;
		} else {
			this.title = `export ${this.local} as ${this.exported}`;
		}
	}
	destroy() {
		super.destroy();

		this.exported = this.local = null;
	}
}
