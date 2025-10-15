import { useState, useCallback, useMemo } from "react";
import FileStruct from "../../js_code_struct/help_struct/file_struct/file_struct.js";
import useGetDomHeight from "../../../../../hooks/use_get_dom_height.js";

export default function useJsCodeStructsTree(analysisConfig) {
	const { domRef, setHeightByDom, height } = useGetDomHeight();
	// 包含所有 codeStruct 的 map
	const codeStructsMap = useMemo(() => {
		window.codeStructsMap = {};
		return window.codeStructsMap;
	}, []);

	const [codeStructsTreeData, setCodeStructsTreeData] = useState(null);
	const [codeStructsTreeSelectedKeys, setCodeStructsTreeSelectedKeys] = useState([]);

	const [selectedCodeStruct, setSelectedCodeStruct] = useState(null);

	/** 选择当前展示的代码结构信息 */
	const onSetCodeStructsTreeSelectedKeys = useCallback(
		(_codeFilesTreeSelectedKeys) => {
		setCodeStructsTreeSelectedKeys(_codeFilesTreeSelectedKeys);
			setSelectedCodeStruct(codeStructsMap[_codeFilesTreeSelectedKeys[0]]);
		},
		[codeStructsMap]
	);
	/** 根据代码文件创建代码结构 */
	const createFileStructByCodeFile = useCallback(
		(codeFile) => {
			return FileStruct.createByCodeFile(codeFile, codeStructsMap, analysisConfig);
		},
		[codeStructsMap, analysisConfig]
	);
	/** 直接初始化所有 code files 的 ast */
	const createAllStructsByAllCodeFiles = useCallback(
		(allFiles) => {
			// 直接初始化所有 code files 的 ast
			for (let i = 0, len = allFiles.length; i < len; i++) {
				createFileStructByCodeFile(allFiles[i], analysisConfig);
			}
		},
		[createFileStructByCodeFile]
	);
	/** 根据选择的代码文件, 展示代码结构 */
	const setSelectedCodeStructByCodeFile = useCallback(
		(codeFile) => {
			if (codeFile) {
				const fileStruct = createFileStructByCodeFile(codeFile);
				setCodeStructsTreeData([fileStruct]);
				onSetCodeStructsTreeSelectedKeys([fileStruct.key]);
			}
		},
		[createFileStructByCodeFile, onSetCodeStructsTreeSelectedKeys]
	);

	return {
		codeStructsTreeContainerDomRef: domRef,
		setCodeStructsTreeContainerDomHeight: setHeightByDom,
		codeStructsTreeContainerDomHeight: height,

		codeStructsTreeData,
		codeStructsTreeSelectedKeys,
		onSetCodeStructsTreeSelectedKeys,

		createAllStructsByAllCodeFiles,
		setSelectedCodeStructByCodeFile,
		selectedCodeStruct,
	};
}
