import { useState, useMemo, useCallback } from "react";
import FileStruct from "../../js_code_struct/ast_struct/file_struct.js";

export default function useJsCodeStructsTree() {
	// 包含所有 codeStruct 的 map
	const codeStructsMap = useMemo(() => {
		return window.codeStructsMap;
	}, []);

	const [codeStructsTreeData, setCodeStructsTreeData] = useState(null);
	const [codeStructsTreeSelectedKeys, setCodeStructsTreeSelectedKeys] = useState([]);

	const [selectedCodeStruct, setSelectedCodeStruct] = useState(null);

	/** 选择当前展示的代码结构信息 */
	const onSetCodeStructsTreeSelectedKeys = useCallback((_codeFilesTreeSelectedKeys, _codeFilesMap) => {
		setCodeStructsTreeSelectedKeys(_codeFilesTreeSelectedKeys);
		setSelectedCodeStruct(_codeFilesMap[_codeFilesTreeSelectedKeys[0]]);
	}, []);
	/** 根据代码文件创建代码结构 */
	const createStructByCodeFile = useCallback(
		(codeFile) => {
			return FileStruct.createByCodeFile(codeFile, codeStructsMap);
		},
		[codeStructsMap]
	);
	/** 根据选择的代码文件, 展示代码结构 */
	const setSelectedCodeStructByCodeFile = useCallback(
		(codeFile) => {
			setCodeStructsTreeData([createStructByCodeFile(codeFile)]);
		},
		[createStructByCodeFile]
	);

	return {
		codeStructsMap,
		codeStructsTreeData,
		codeStructsTreeSelectedKeys,
		onSetCodeStructsTreeSelectedKeys,

		setSelectedCodeStructByCodeFile,
		selectedCodeStruct,
	};
}
