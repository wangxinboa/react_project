import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class ImportStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "Import";

		this.isImportedFileStruct = true;
	}
	destroy() {
		super.destroy();

		this.isImportedFileStruct = null;
	}

	afterSetParentRelation() {
		// 检查父结构类型
		if (this.parentStruct.isCallExpressionStruct) {
			const parentStructAstArguments = this.parentStruct.isImport();
			if (!this.parentStruct.isImport()) {
				console.error(
					"ImportStruct class 实例",
					this,
					"执行 afterSetParentRelation, this.parentStruct",
					this.parentStruct,
					"ast 属性 arguments 属性",
					parentStructAstArguments,
					"的判定未过"
				);
				throw new Error(
					"ImportStruct class 实例执行 afterSetParentRelation, this.parentStruct ast 属性 arguments 属性 的判定未过"
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
