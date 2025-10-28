import BaseOperationRecord from "../base_operation_record.js";

export default class ImportDeclarationOperation extends BaseOperationRecord {
	constructor(importDeclarationStruct) {
		super();

		this.title = "ImportDeclarationOperation";
		this.isImportDeclarationOperation = true;

		this.importDeclarationStruct = importDeclarationStruct;

		this.codeFile = importDeclarationStruct.getSourceCodeFile();
		/** 初始化导入的 fileStruct */
		this.importedFileStruct = importDeclarationStruct.fileStruct.addImportFileStructByCodeFile(this.codeFile);
		this.isFirstImported = !this.importedFileStruct.executed;

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

			importDeclarationStruct.environmentStruct.addVariableByImportSpecifierStruct(
				specifierStruct,
				this.importedFileStruct
			);

			if (specifierStruct.isImportSpecifier) {
				this.importSpecifierStructs.push(specifierStruct);
			} else if (specifierStruct.isImportDefaultSpecifier) {
				this.importDefaultSpecifierStruct = specifierStruct;
			} else if (specifierStruct.isImportNamespaceSpecifier) {
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

	async executeFirstImportedFileStruct() {
		if (this.isFirstImported) {
			await this.importedFileStruct.execute();
		}
	}

	destroy() {
		super.destroy();

		this.title =
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
