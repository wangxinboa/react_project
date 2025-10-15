import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isIdentifierAst } from "../../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../../js_code_struct_utils/get_ast_attribute_value.js";
import { checkImportSpecifierAfterSetParentRelation } from "./check_import_specifier.js";

export default class ImportDefaultSpecifierStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (!isIdentifierAst(ast.local)) {
			console.error(
				"初始化 ImportDefaultSpecifierStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ImportDefaultSpecifierStruct 时, 根据属性 ast.local",
				ast.local,
				"获取导入变量名, 但是 ast.local 不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ImportDefaultSpecifierStruct 根据 ast, 环境结构 environmentStruct 创建 ImportDefaultSpecifierStruct 时, 根据属性 ast.local 获取导入变量名, 但是 ast.local 不是 IdentifierAst, 数据类型有误"
			);
		}
		this.local = getIdentifierName(ast.local);

		this.type = "ImportDefaultSpecifier";
		this.title = `import ${this.local}`;
	}
	destroy() {
		super.destroy();

		this.local = null;
	}

	afterSetParentRelation() {
		checkImportSpecifierAfterSetParentRelation(this);
	}
}
