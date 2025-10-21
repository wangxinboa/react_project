import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../../js_code_struct_utils/get_ast_attribute_value.js";
import { checkImportSpecifierAfterSetParentRelation } from "./check_import_specifier.js";

export default class ImportNamespaceSpecifierStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isImportNamespaceSpecifier = true;

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

		this.type = "ImportNamespaceSpecifier";
	}
	destroy() {
		super.destroy();

		this.isImportNamespaceSpecifier = this.local = null;
	}

	afterSetParentRelation() {
		checkImportSpecifierAfterSetParentRelation(this);
	}
}
