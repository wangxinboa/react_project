import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isStringLiteralAst } from "../../../js_code_struct_utils/ast_types.js";
import { getStringLiteralValue } from "../../../js_code_struct_utils/get_ast_attribute_value.js";

export default class ExportNamedDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isExportNamedDeclarationStruct = true;
		this.exportKind = ast.exportKind;

		this.type = "ExportNamedDeclaration";

		if (ast.source === null) {
			this.source = null;
		} else if (isStringLiteralAst(ast.source)) {
			this.source = getStringLiteralValue(ast.source);
		} else {
			console.error(
				"初始化 ExportNamedDeclarationStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ExportNamedDeclarationStruct 时, 根据属性名 ast.source",
				ast.source,
				"获取导入文件路径, 但是 ast.source 不是 null 也不是 StringLiteralAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ExportNamedDeclarationStruct 根据 ast, 环境结构 environmentStruct 创建 ExportNamedDeclarationStruct 时, 根据属性名 ast.source 获取导入文件路径, 但是 ast.source 不是 null 也不是 StringLiteralAst, 数据类型有误"
			);
		}
	}
	destroy() {
		super.destroy();

		this.isExportNamedDeclarationStruct = this.exportKind = this.source = null;
	}
}
