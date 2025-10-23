import { useState, useCallback, useMemo } from "react";
import FileStruct from "../../js_code_struct/help_struct/file_struct/file_struct.js";
import AstRelationManager from "../../js_code_struct/ast_relation_manager/ast_relation_manager.js";

export default function useJsCodeAnalysis(analysisConfig) {
	const codeStructsMessage = useMemo(() => {
		window.codeStructsMessage = {
			codeStructsMap: {},
			fileStructs: [],
			astRelationManager: new AstRelationManager(),
		};
		return window.codeStructsMessage;
	}, []);

	const [codeStructsTreeData, setCodeStructsTreeData] = useState(null);

	const [selectedCodeFileStruct, setSelectedCodeFileStruct] = useState(null);

	const clearCodeStructsMap = useCallback(() => {
		for (let i = 0, len = codeStructsMessage.fileStructs.length; i < len; i++) {
			const fileStruct = codeStructsMessage.fileStructs[i];
			fileStruct.destroy();
		}
		codeStructsMessage.fileStructs = [];
		codeStructsMessage.astRelationManager.clear();

		setCodeStructsTreeData([]);
		setSelectedCodeFileStruct(null);
	}, [codeStructsMessage]);
	window.clearCodeStructsMap = clearCodeStructsMap;

	/** 根据代码文件创建代码结构 */
	const createFileStructByCodeFile = useCallback(
		(codeFile) => {
			return FileStruct.createByCodeFile(codeFile, codeStructsMessage, analysisConfig);
		},
		[codeStructsMessage, analysisConfig]
	);
	/** 直接初始化所有 code files 的 ast */
	const createAllStructsByAllCodeFiles = useCallback((allFiles, analysisConfig) => {
		// 直接初始化所有 code files 的 ast
		// for (let i = 0, len = allFiles.length; i < len; i++) {
		// 	createFileStructByCodeFile(allFiles[i], analysisConfig);
		// }
	}, []);
	/** 根据选择的代码文件, 展示代码结构 */
	const setSelectedCodeStructByCodeFile = useCallback(
		(codeFile) => {
			if (codeFile) {
				const fileStruct = createFileStructByCodeFile(codeFile);
				setCodeStructsTreeData([fileStruct]);
				setSelectedCodeFileStruct(fileStruct);
			}
		},
		[createFileStructByCodeFile]
	);

	return {
		astRelationManager: codeStructsMessage.astRelationManager,
		codeStructsTreeData,

		createAllStructsByAllCodeFiles,
		setSelectedCodeStructByCodeFile,
		selectedCodeFileStruct,
	};
}
