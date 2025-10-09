import ScopeStruct from "../help_struct/scope_struct/scope_struct.js";
import createAstByCodeFile from "../js_code_struct_utils/create_ast_by_code_file.js";
import { isFileAst } from "../js_code_struct_utils/ast_types.js";
import { addChildCodeStructByAst } from "../js_code_struct_utils/add_child_code_struct_by_ast/add_child_code_struct_by_ast.js";

export default class FileStruct extends ScopeStruct {
	static type = "File";
	constructor(key, codeFile, codeStructsMap) {
		super(codeStructsMap);

		this.key = key;

		this.fileStruct = this;
		this.structPathSegments = [this];
		this.type = FileStruct.type;
		this.title = codeFile.name;

		this.isFileStruct = true;
		this.codeFile = codeFile;

		this.codeStructsMap[key] = this;
	}

	destroy() {
		super.destroy();

		this.isFileStruct = this.codeFile = null;
	}

	/** 根据 importDeclaration ast 添加变量 */
	_addVariableByImportDeclarationAst(importDeclarationAst) {
		// console.info("importDeclarationAst:", importDeclarationAst);
	}

	/**
	 * 根据 CodeFile 相关的信息, 生成 ast, 并对应的创建返回 codeFileStructsMap 中的 FileStruct 以及对应 ast 的孩子 codeStruct
	 * @param codeFile
	 * @param {*} codeStructsMap
	 * @returns
	 */
	static createByCodeFile(codeFile, codeStructsMap) {
		const key = `${FileStruct.type}:${codeFile.key}`;
		if (key in codeStructsMap) {
			return codeStructsMap[key];
		} else {
			const fileAst = createAstByCodeFile(codeFile);

			if (isFileAst(fileAst)) {
				const fileStruct = new FileStruct(key, codeFile, codeStructsMap);
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
