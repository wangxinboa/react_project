import VariableMap from "./base_struct/variable/variable_map.js";
import createAstByCodeFile from "./js_code_struct_utils/create_ast_by_code_file.js";
import { isFileAst } from "./js_code_struct_utils/ast_types.js";

export default class FileStruct extends VariableMap {
	static type = "File";

	constructor(baseKey, codeStructsMap, codeFile) {
		super(baseKey);
		this.isFileStruct = true;

		this.type = FileStruct.type;
		this.title = codeFile.name;

		this.codeFile = codeFile;

		this.initFileStruct(codeStructsMap);
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
	 * @param string fileKey FileStruct 的 key 值, 即原始文件的 webkitRelativePath
	 * @param {*} codeFileStructsMap
	 * @param {*} codeStructsMap
	 * @returns
	 */
	static createByCodeFile(codeFile, codeStructsMap) {
		const _baseKey = `${FileStruct.type}:${codeFile.key}`;
		if (_baseKey in codeStructsMap) {
			return codeStructsMap[_baseKey];
		} else {
			const fileAst = createAstByCodeFile(codeFile);

			if (isFileAst(fileAst)) {
				const fileStruct = new FileStruct(_baseKey, codeStructsMap, codeFile);

				fileStruct.executeByAsts(fileAst.program.body, "body");

				return fileStruct;
			} else {
				throw new Error("根据代码文件生成的 ast 根节点类型有误, 不是 file 类型");
			}
		}
	}
}
