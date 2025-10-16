import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { isStringLiteralAst } from "../../js_code_struct_utils/ast_types.js";
import { getStringLiteralValue } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class ImportStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "Import";
	}
	destroy() {
		super.destroy();

		this.importedFileStruct = null;
	}

	afterSetParentRelation() {
		// 检查父结构类型
		if (this.parentStruct.isCallExpressionStruct) {
			const parentStructAstArguments = this.parentStruct.getAstArguments();
			if (parentStructAstArguments.length === 1 && isStringLiteralAst(parentStructAstArguments[0])) {
				this.importedFileStruct = this.fileStruct.addImportFileStructBySource(
					getStringLiteralValue(parentStructAstArguments[0])
				);
			} else {
				console.warn(
					"ImportStruct class 实例",
					this,
					"执行 afterSetParentRelation, this.parentStruct",
					this.parentStruct,
					"ast 属性 arguments 属性",
					parentStructAstArguments,
					"的判定未过"
				);
			}
		} else {
			console.error(
				"ImportStruct class 实例",
				this,
				"执行 afterSetParentRelation, this.parentStruct",
				this.parentStruct,
				"是未处理的类型, 待完善"
			);
			throw new Error("ImportStruct class 实例 执行 afterSetParentRelation, this.parentStruct 是未处理的类型, 待完善");
		}
	}
}
