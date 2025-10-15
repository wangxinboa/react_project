import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";
import { isStringLiteralAst } from "../../../js_code_struct_utils/ast_types.js";
import { getStringLiteralValue } from "../../../js_code_struct_utils/get_ast_attribute_value.js";

export default class ImportDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isImportDeclarationStruct = true;

		if (!isStringLiteralAst(ast.source)) {
			console.error(
				"初始化 ImportDeclarationStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ImportDeclarationStruct 时, 根据属性名 ast.source",
				ast.source,
				"获取对象属性名, 但是 ast.source 不是 StringLiteralAst, 数据类型有误"
			);
			throw new Error(
				"初始化 ImportDeclarationStruct 根据 ast, 环境结构 environmentStruct 创建 ImportDeclarationStruct 时, 根据属性名 ast.source 获取对象属性名, 但是 ast.source 不是 StringLiteralAst, 数据类型有误"
			);
		}
		this.source = getStringLiteralValue(ast.source);
		this.importKind = ast.importKind;

		this.importedFileStruct = null;

		this.type = "ImportDeclaration";
		this.title = `from ${this.source}`;
	}
	destroy() {
		super.destroy();

		this.isImportDeclarationStruct = this.source = this.importKind = this.importedFileStruct = null;
	}

	getSourceCodeFile() {
		return this.fileStruct.codeFile.getCodeFileByRelativePath(this.source);
	}
	getSourceCodeFilePath() {
		return this.getSourceCodeFile().key;
	}

	afterSetParentRelation() {
		this.importedFileStruct = this.fileStruct.addImportFileStructBySource(this.source);
	}
}
