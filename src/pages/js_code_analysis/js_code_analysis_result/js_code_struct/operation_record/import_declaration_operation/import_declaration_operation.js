import BaseOperationRecord from "../base_operation_record.js";

export default class ImportDeclarationOperation extends BaseOperationRecord {
	constructor(importDeclarationStruct) {
		super();

		this.isImportDeclarationOperation = true;

		this.importDeclarationStruct = importDeclarationStruct;

		this.codeFile = importDeclarationStruct.getSourceCodeFile();
		this.isFirstImported = !importDeclarationStruct.fileStruct.hasCodeFileStruct(this.codeFile);
		/** 初始化导入的 fileStruct */
		this.importedFileStruct = importDeclarationStruct.fileStruct.addImportFileStructByCodeFile(this.codeFile);

		// 如果导入文件是第一次导入的话, 就会添加对应的操作作为孩子节点
		if (this.isFirstImported) {
			this.children = this.importedFileStruct.operationRecords;
		}

		this.specifierStructs = importDeclarationStruct.children;

		this.importSpecifierStructs = [];
		this.importDefaultSpecifierStruct = null;
		this.importNamespaceSpecifierStruct = null;
		// 添加导入的变量 specifier
		for (let i = 0, len = importDeclarationStruct.children.length; i < len; i++) {
			const specifierStruct = importDeclarationStruct.children[i];

			if (specifierStruct.isImportSpecifier) {
				importDeclarationStruct.environmentStruct.addVariableByImportSpecifierStruct(
					specifierStruct,
					this.importedFileStruct
				);

				this.importSpecifierStructs.push(specifierStruct);
			} else if (specifierStruct.isImportDefaultSpecifier) {
				importDeclarationStruct.environmentStruct.addVariableByImportSpecifierStruct(
					specifierStruct,
					this.importedFileStruct
				);

				this.importDefaultSpecifierStruct = specifierStruct;
			} else if (specifierStruct.isImportNamespaceSpecifier) {
				importDeclarationStruct.environmentStruct.addVariableByImportSpecifierStruct(
					specifierStruct,
					this.importedFileStruct
				);

				this.importNamespaceSpecifierStruct = specifierStruct;
			} else {
				console.error(
					"初始化 ImportDeclarationOperation, specifierStruct",
					specifierStruct,
					"是不应该存在的未处理的类型"
				);
				throw new Error("初始化 ImportDeclarationOperation, specifierStruct 是不应该存在的未处理的类型");
			}
		}
	}

	destroy() {
		super.destroy();

		this.isImportDeclarationOperation =
			this.importDeclarationStruct =
			this.codeFile =
			this.isFirstImported =
			this.importedFileStruct =
			this.children =
			this.specifierStructs =
				null;
	}

	static createByImportDeclarationStruct(importDeclarationStruct) {
		return new ImportDeclarationOperation(importDeclarationStruct);
	}
}
