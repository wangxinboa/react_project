import { useState, useCallback } from "react";
import createCodeFilesTreeByFileList from "../../code_files/create_code_files_tree_by_file_list.js";

export default function useCodeFilesTree(setSelectedCodeStructByCodeFile) {
	// code file
	const [codeFilesMap, setCodeFilesMap] = useState({});
	const [codeFilesTreeData, setCodeFilesTreeData] = useState([]);
	const [codeFilesTreeExpandedKeys, setCodeFilesTreeExpandedKeys] = useState([]);
	const [codeFilesTreeSelectedKeys, setCodeFilesTreeSelectedKeys] = useState([]);
	/** 当前选择的代码文件  */
	const [selectedCodeFile, setSelectedCodeFile] = useState(null);

	/** 选择当前展示的代码文件 */
	const onSetCodeFilesTreeSelectedKeys = useCallback(
		(_codeFilesTreeSelectedKeys, _codeFilesMap) => {
			setCodeFilesTreeSelectedKeys(_codeFilesTreeSelectedKeys);

			const _selectedCodeFile = _codeFilesMap[_codeFilesTreeSelectedKeys[0]] ?? null;
			setSelectedCodeFile(_selectedCodeFile);
			setSelectedCodeStructByCodeFile(_selectedCodeFile);
		},
		[setSelectedCodeStructByCodeFile]
	);
	/** 根据解析上传文件生成的 rootFolder 初始化 code files */
	const initCodeFilesByRootFolder = useCallback((rootFolder) => {
		setCodeFilesMap(rootFolder.codeFilesMap);
		setCodeFilesTreeData([rootFolder]);
		setCodeFilesTreeExpandedKeys([]);
		setCodeFilesTreeSelectedKeys([]);
		setSelectedCodeFile(null);
	}, []);
	/** 通过上传的文件设置 CodeFilesTree 信息 */
	const initCodeFilesByFiles = useCallback(
		(files) => {
			return createCodeFilesTreeByFileList(files).readFilesAsText().then(initCodeFilesByRootFolder);
		},
		[initCodeFilesByRootFolder]
	);
	/** 根据 service 接口信息初始化 code files */
	const initCodeFilesByService = useCallback(
		(serviceData) => {
			// 初始化 codeFiles
			setCodeFilesMap(serviceData.codeFilesMap ?? {});
			setCodeFilesTreeData(serviceData.treeData ?? []);
			setCodeFilesTreeExpandedKeys(serviceData.expandedKeys ?? []);

			onSetCodeFilesTreeSelectedKeys(serviceData.selectedKeys ?? [], serviceData.codeFilesMap ?? {});
		},
		[onSetCodeFilesTreeSelectedKeys]
	);
	/** 根据 code files 生成对应 service 接口数据格式 */
	const createServiceDataByCodeFiles = useCallback(() => {
		return {
			codeFilesMap,
			treeData: codeFilesTreeData,
			expandedKeys: codeFilesTreeExpandedKeys,
			selectedKeys: codeFilesTreeSelectedKeys,
		};
	}, [codeFilesMap, codeFilesTreeData, codeFilesTreeExpandedKeys, codeFilesTreeSelectedKeys]);

	return {
		codeFilesMap,
		codeFilesTreeData,
		codeFilesTreeExpandedKeys,
		setCodeFilesTreeExpandedKeys,
		codeFilesTreeSelectedKeys,
		onSetCodeFilesTreeSelectedKeys,
		initCodeFilesByFiles,
		initCodeFilesByService,
		createServiceDataByCodeFiles,
		selectedCodeFile,
	};
}
