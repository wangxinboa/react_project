import { useCallback } from "react";
import { useState, useEffect } from "react";
import createCodeFilesTreeFromFileList from "../../code_files/create_code_files_tree_from_file_list.js";

export default function useCodeFilesTree() {
	// code file
	const [codeFilesMap, setCodeFilesMap] = useState({});
	const [codeFilesTreeData, setCodeFilesTreeData] = useState([]);
	const [codeFilesTreeExpandedKeys, setCodeFilesTreeExpandedKeys] = useState([]);
	const [codeFilesTreeSelectedKeys, setCodeFilesTreeSelectedKeys] = useState([]);

	const [selectedCodeFile, setSelectedCodeFile] = useState(null);

	/** 根据解析上传文件生成的 rootFolder 初始化 code files */
	const initCodeFilesFromRootFolder = useCallback((rootFolder) => {
		setCodeFilesMap(rootFolder.codeFilesMap);
		setCodeFilesTreeData([rootFolder]);
		setCodeFilesTreeExpandedKeys([]);
		setCodeFilesTreeSelectedKeys([]);
	}, []);
	/** 通过上传的文件设置 CodeFilesTree 信息 */
	const initCodeFilesFromFiles = useCallback(
		(files) => {
			return createCodeFilesTreeFromFileList(files).readFilesAsText().then(initCodeFilesFromRootFolder);
		},
		[initCodeFilesFromRootFolder]
	);
	/** 根据 service 接口信息初始化 code files */
	const initCodeFilesFromService = useCallback((serviceData) => {
		// 初始化 codeFiles
		setCodeFilesMap(serviceData.codeFilesMap ?? {});
		setCodeFilesTreeData(serviceData.treeData ?? []);
		setCodeFilesTreeExpandedKeys(serviceData.expandedKeys ?? []);
		setCodeFilesTreeSelectedKeys(serviceData.selectedKeys ?? []);
	}, []);
	/** 根据 code files 生成对应 service 接口数据格式 */
	const createServiceDataFromCodeFiles = useCallback(() => {
		return {
			codeFilesMap,
			treeData: codeFilesTreeData,
			expandedKeys: codeFilesTreeExpandedKeys,
			selectedKeys: codeFilesTreeSelectedKeys,
		};
	}, [codeFilesMap, codeFilesTreeData, codeFilesTreeExpandedKeys, codeFilesTreeSelectedKeys]);

	/** 监听选择 selectedCodeFile */
	useEffect(() => {
		setSelectedCodeFile?.(codeFilesMap?.[codeFilesTreeSelectedKeys[0]] ?? null);
	}, [codeFilesMap, codeFilesTreeSelectedKeys]);

	return {
		codeFilesMap,
		codeFilesTreeData,
		codeFilesTreeExpandedKeys,
		setCodeFilesTreeExpandedKeys,
		codeFilesTreeSelectedKeys,
		setCodeFilesTreeSelectedKeys,

		initCodeFilesFromFiles,
		initCodeFilesFromService,
		createServiceDataFromCodeFiles,

		selectedCodeFile,
	};
}
