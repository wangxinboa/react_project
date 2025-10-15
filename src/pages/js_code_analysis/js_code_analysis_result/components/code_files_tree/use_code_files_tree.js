import { useState, useCallback } from "react";
import { message } from "antd";

import useGetDomHeight from "../../../../../hooks/use_get_dom_height.js";
import createCodeFilesTreeByFileList from "../../code_files/create_code_files_tree_by_file_list.js";
import RootCodeFolder from "../../code_files/root_code_folder.js";

export default function useCodeFilesTree(setSelectedCodeStructByCodeFile) {
	const { domRef, setHeightByDom, height } = useGetDomHeight();
	// code file
	const [rootCodeFolder, setRootCodeFolder] = useState(null);
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
	const initCodeFilesByRootFolder = useCallback((_rootCodeFolder) => {
		setRootCodeFolder(_rootCodeFolder);

		setCodeFilesMap(_rootCodeFolder.codeFilesMap);
		setCodeFilesTreeData(_rootCodeFolder.children);
		setCodeFilesTreeExpandedKeys([]);
		setCodeFilesTreeSelectedKeys([]);
		setSelectedCodeFile(null);

		return _rootCodeFolder;
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
			if (!serviceData?.rootCodeFolder) {
				message.warning("请上传代码文件进行初始化");
				return;
			}
			const rootCodeFolder = RootCodeFolder.createFromJson(serviceData?.rootCodeFolder);

			// 初始化 codeFiles
			setRootCodeFolder(rootCodeFolder);
			setCodeFilesMap(rootCodeFolder.codeFilesMap);
			setCodeFilesTreeData(rootCodeFolder.children);
			setCodeFilesTreeExpandedKeys(serviceData.expandedKeys ?? []);

			onSetCodeFilesTreeSelectedKeys(serviceData.selectedKeys ?? [], rootCodeFolder.codeFilesMap ?? {});

			window.rootCodeFolder = rootCodeFolder;
			return rootCodeFolder;
		},
		[onSetCodeFilesTreeSelectedKeys]
	);
	/** 根据 code files 生成对应 service 接口数据格式 */
	const createServiceDataByCodeFiles = useCallback(() => {
		return {
			rootCodeFolder,
			expandedKeys: codeFilesTreeExpandedKeys,
			selectedKeys: codeFilesTreeSelectedKeys,
		};
	}, [rootCodeFolder, codeFilesTreeExpandedKeys, codeFilesTreeSelectedKeys]);

	return {
		codeFilesTreeContainerDomRef: domRef,
		setCodeFilesTreeContainerDomHeight: setHeightByDom,
		codeFilesTreeContainerDomHeight: height,

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
