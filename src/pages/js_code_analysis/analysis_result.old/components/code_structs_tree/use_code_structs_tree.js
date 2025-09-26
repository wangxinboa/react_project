import { useState, useEffect, useCallback } from "react";
import { message } from "antd";

import FileStruct from "../../code_struct/file_struct.js";
import { createStructSelectOption } from "../../code_struct/code_struct_utils/create_option.js";
import createFileStructFromJSON from "../../code_struct/code_struct_utils/create_struct_from_json.js";
import createStructFromCodeString from "../../code_struct/code_struct_utils/create_struct_from_code_string/create_struct_from_code_string.js";

export default function useCodeStructsTree(selectedCodeFile) {
	// 包含 codeFileStruct 的 map
	const [codeFileStructsMap, setCodeFileStructsMap] = useState({});
	// 包含所有 codeStruct 的 map
	const [codeStructsMap, setCodeStructsMap] = useState({});
	// 包含所有 code struct 的 select option, value 和 label 都为 code struct 的 key
	const [allCodeStructSelectOptions, setAllCodeStructSelectOptions] = useState([]);

	const [codeStructsTreeData, setCodeStructsTreeData] = useState(null);
	const [codeStructsTreeSelectedKeys, setCodeStructsTreeSelectedKeys] = useState([]);

	const [selectedCodeStruct, setSelectedCodeStruct] = useState(null);

	/** 当添加新的 code struct 时, 生成相关的 option 添加到 allCodeStructSelectOptions 中 */
	const onAddNewCodeStruct = useCallback(
		(newCodeStruct) => {
			setAllCodeStructSelectOptions([...allCodeStructSelectOptions, createStructSelectOption(newCodeStruct)]);
		},
		[allCodeStructSelectOptions, setAllCodeStructSelectOptions]
	);
	/** 根据接口信息初始化 code structs */
	const initCodeStructsFromService = useCallback((codeFileKeys, codeFilesMap, serviceData) => {
		// // 初始化 codeStructs
		const _fileStructsMap = {};
		const _codeStructsMap = {};
		const _allCodeStructSelectOptions = [];

		for (let i = 0, len = codeFileKeys.length; i < len; i++) {
			const _codeFileStructBaseKey_ = codeFileKeys[i];

			if (_codeFileStructBaseKey_ in serviceData.codeFileStructsMap) {
				_fileStructsMap[_codeFileStructBaseKey_] = createFileStructFromJSON(
					codeFilesMap[_codeFileStructBaseKey_],
					serviceData.codeFileStructsMap[_codeFileStructBaseKey_],
					_codeStructsMap,
					_allCodeStructSelectOptions
				);
			}
		}

		setCodeFileStructsMap(_fileStructsMap);
		setCodeStructsMap(_codeStructsMap);
		setAllCodeStructSelectOptions(_allCodeStructSelectOptions);
		setCodeStructsTreeSelectedKeys(serviceData.selectedKeys ?? []);

		return { codeStructsMap: _codeStructsMap };
	}, []);
	const createServiceDataFromCodeStructs = useCallback(() => {
		return {
			codeFileStructsMap,
			selectedKeys: codeStructsTreeSelectedKeys,
		};
	}, [codeFileStructsMap, codeStructsTreeSelectedKeys]);

	// 监听 selectedCodeFile 的选择
	useEffect(() => {
		if (selectedCodeFile !== null) {
			// File 对应的 FileStruct key
			const _fileStructKey = selectedCodeFile.key;
			// 如果 codeFileStructsMap 不存在代码文件对应的 FileStruct 的话, 就根据代码文件生成一个 FileStruct
			if (!codeFileStructsMap[_fileStructKey]) {
				createStructFromCodeString(selectedCodeFile?.aceMessage?.code);
				message.info({
					key: _fileStructKey,
					content: `${_fileStructKey} 初始化 FileStruct`,
				});
				codeFileStructsMap[_fileStructKey] = FileStruct.createStructFromFile(selectedCodeFile, codeStructsMap);
			}
			// 设置 CodeStructsTree 信息
			setCodeStructsTreeData([codeFileStructsMap[_fileStructKey]]);
		}
	}, [codeFileStructsMap, codeStructsMap, selectedCodeFile]);

	return {
		setCodeStructsTreeData,

		codeStructsMap,

		codeStructsTreeData,
		codeStructsTreeSelectedKeys,
		setCodeStructsTreeSelectedKeys,

		selectedCodeStruct,
		setSelectedCodeStruct,

		allCodeStructSelectOptions,
		onAddNewCodeStruct,

		initCodeStructsFromService,
		createServiceDataFromCodeStructs,
	};
}
