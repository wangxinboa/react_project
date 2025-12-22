import ExportMap from "./export_map.js";
import createAstByCodeFile from "../../js_code_struct_utils/create_ast_by_code_file.js";
import { isFileAst } from "../../js_code_struct_utils/ast_types.js";
import { addChildCodeStructByAst } from "../../js_code_struct_utils/add_child_code_struct_by_ast/add_child_code_struct_by_ast.js";

export default class FileStruct extends ExportMap {
	static type = "File";
	constructor(key, codeFile, codeStructsMessage, analysisConfig) {
		super(codeStructsMessage);

		this.key = key;

		this.isFileStruct = true;
		this.codeFile = codeFile;

		this.analysisConfig = analysisConfig;

		this.importDeclarationStructs = [];
		this.normalStructs = [];

		this.fileStruct = this;
		this.structPathSegments = [this];
		this.type = FileStruct.type;
		this.title = codeFile.name;

		this.codeStructsMessage.fileStructs.push(this);
		this.codeStructsMessage.codeStructsMap[key] = this;
	}

	destroy() {
		delete this.codeStructsMessage.codeStructsMap[this.key];

		this.key =
			this.isFileStruct =
			this.codeFile =
			this.analysisConfig =
			this.importDeclarationStructs =
			this.normalStructs =
				null;

		super.destroy();
	}

	getCodeFileKey() {
		return this.codeFile.key;
	}
	getCodeFileName() {
		return this.codeFile.name;
	}
	getCodeString() {
		return this.codeFile.codeMessage.codeString;
	}
	getImportPackageSourcePath(importSource) {
		return this.analysisConfig.importPackageSourcePathsMap[importSource];
	}
	/** 根据传入的 codeFile 结合自身的 codeStructsMessage, analysisConfig 创建 FileStruct */
	createFileStructByCodeFile(codeFile) {
		return FileStruct.createByCodeFile(codeFile, this.codeStructsMessage, this.analysisConfig);
	}
	/** codeStructsMap 是否已存在 codeFile 对应的 fileStruct */
	hasCodeFileStruct(codeFile) {
		const key = `${FileStruct.type}:${codeFile.key}`;
		return key in this.codeStructsMessage.codeStructsMap;
	}

	afterAddChildCodeStruct(childCodeStruct) {
		if (childCodeStruct.isImportDeclarationStruct) {
			this.importDeclarationStructs.push(childCodeStruct);
		} else {
			this.normalStructs.push(childCodeStruct);
		}
	}

	/** 根据传入的 codeFile 和 codeStructsMap, 返回 codeStructsMap 中的 fileStruct */
	static getByCodeFile(codeFile, codeStructsMap) {
		const key = `${FileStruct.type}:${codeFile.key}`;
		if (key in codeStructsMap) {
			return codeStructsMap[key];
		}
		return null;
	}

	/** 根据 CodeFile 相关的信息, 生成 ast, 并对应的创建返回 codeFileStructsMap 中的 FileStruct 以及对应 ast 的孩子 codeStruct */
	static createByCodeFile(codeFile, codeStructsMessage, analysisConfig) {
		const key = `${FileStruct.type}:${codeFile.key}`;
		const codeStructsMap = codeStructsMessage.codeStructsMap;
		if (key in codeStructsMap) {
			return codeStructsMap[key];
		} else {
			const fileAst = createAstByCodeFile(codeFile);

			if (isFileAst(fileAst)) {
				const fileStruct = new FileStruct(key, codeFile, codeStructsMessage, analysisConfig);
				const fileAstProgramBodyAsts = fileAst.program.body;
				if (Array.isArray(fileAstProgramBodyAsts)) {
					for (let i = 0, len = fileAstProgramBodyAsts.length; i < len; i++) {
						const fileProgramBodyAst = fileAstProgramBodyAsts[i];
						addChildCodeStructByAst(fileStruct, fileProgramBodyAst, fileStruct, "body");
					}
				} else {
					throw new Error(
						"FileStruct.createByCodeFile 根据 fileAst 执行操作中, fileAst.program.body 不是数组, 数据类型有误"
					);
				}
				return fileStruct;
			} else {
				throw new Error("根据代码文件生成的 ast 根节点类型有误, 不是 file 类型");
			}
		}
	}
}
