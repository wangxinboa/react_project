import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../../js_code_struct_utils/get_ast_attribute_value.js";

export default class ImportSpecifierStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (!isIdentifierAst(ast.imported)) {
			console.error(
				"初始化 ImportSpecifierStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ImportSpecifierStruct 时, 根据属性名 ast.imported",
				ast.imported,
				"获取对象属性名, 但是 ast.imported 不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ImportSpecifierStruct 根据 ast, 环境结构 environmentStruct 创建 ImportSpecifierStruct 时, 根据属性名 ast.imported 获取对象属性名, 但是 ast.imported 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.imported = getIdentifierName(ast.imported);

		if (!isIdentifierAst(ast.local)) {
			console.error(
				"初始化 ImportSpecifierStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ImportSpecifierStruct 时, 根据属性名 ast.local",
				ast.local,
				"获取对象属性名, 但是 ast.local 不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ImportSpecifierStruct 根据 ast, 环境结构 environmentStruct 创建 ImportSpecifierStruct 时, 根据属性名 ast.local 获取对象属性名, 但是 ast.local 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.local = getIdentifierName(ast.local);

		this.type = "ImportSpecifier";
		if (this.local === this.imported) {
			this.title = `import ${this.local}`;
		} else {
			this.title = `import ${this.local} as ${this.imported}`;
		}
	}
	destroy() {
		super.destroy();

		this.imported = this.local = null;
	}
}
