import ImportVariableStruct from "../../../../../js_code_struct/help_struct/variable_struct/import_variable_struct.js";
import BaseOperationRecord from "../base_operation_record.js";

export default class ImportDeclarationOperation extends BaseOperationRecord {
	/**
	 * @param {import('../../../../../js_code_struct/ast_struct/modules/imports/import_declaration_struct.js').default} importDeclarationStruct
	 */
	constructor(importDeclarationStruct) {
		super();
		this.isImportDeclarationOperation = true;

		/** @type {import('../../../../../js_code_struct/ast_struct/modules/imports/import_declaration_struct.js').default} */
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

	initAddImportedFileStruct() {
		this.importVariableStructs = [];
		this.defaultImportVariableStruct = null;
		this.namespaceImportVariableStruct = null;

		// 添加导入的变量 specifier
		for (let i = 0, len = this.importDeclarationStruct.children.length; i < len; i++) {
			const specifierStruct = this.importDeclarationStruct.children[i];

			let importVariableStruct;

			if (specifierStruct.isImportSpecifier) {
				importVariableStruct = ImportVariableStruct.createNormal(
					specifierStruct.local,
					specifierStruct.imported,
					this.importedFileStruct
				);
				this.importVariableStructs.push(importVariableStruct);
			} else if (specifierStruct.isImportDefaultSpecifier) {
				importVariableStruct = ImportVariableStruct.createDefault(specifierStruct.local, this.importedFileStruct);
				this.defaultImportVariableStruct = importVariableStruct;
			} else if (specifierStruct.isImportNamespaceSpecifier) {
				importVariableStruct = ImportVariableStruct.createNamespace(specifierStruct.local, this.importedFileStruct);
				this.namespaceImportVariableStruct = importVariableStruct;
			} else {
				console.error(
					"初始化 ImportDeclarationOperation, specifierStruct",
					specifierStruct,
					"是不应该存在的未处理的类型"
				);
				throw new Error("初始化 ImportDeclarationOperation, specifierStruct 是不应该存在的未处理的类型");
			}

			this.importDeclarationStruct.environmentStruct.addVariable(importVariableStruct);
		}
	}

	static async createByImportDeclarationStruct(importDeclarationStruct) {
		const importDeclarationOperation = new ImportDeclarationOperation(importDeclarationStruct);
		if (importDeclarationOperation.isFirstImported) {
			await importDeclarationOperation.importedFileStruct.execute();
		}
		importDeclarationOperation.initAddImportedFileStruct();

		return importDeclarationOperation;
	}
}
