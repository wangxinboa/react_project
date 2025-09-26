import { useMemo, createContext, useEffect } from "react";
import { message } from "antd";

import AnalysisResultPage from "./analysis_result_page.jsx";

import useCodeFilesTree from "./components/code_files_tree/use_code_files_tree.js";
import useCodeStructsTree from "./components/code_structs_tree/use_code_structs_tree.js";
import useConfigureAnalysis from "./components/configure_analysis/use_configure_analysis.js";
import useAnalysisMessage from "./components/analysis_message/use_analysis_message.js";

import { getQuery, downloadJSON } from "../../../utils/utils.js";
import { serviceGetCodeFilesMessage, serviceGetAnalysisMessage } from "../../../service/service_analysis_result.js";

export const AnalysisResultContext = createContext();

const AnalysisResult = () => {
	// code files
	const {
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
	} = useCodeFilesTree();
	// code structs
	const {
		codeStructsMap,

		codeStructsTreeData,
		setCodeStructsTreeData,
		codeStructsTreeSelectedKeys,
		setCodeStructsTreeSelectedKeys,

		selectedCodeStruct,
		setSelectedCodeStruct,

		allCodeStructSelectOptions,
		onAddNewCodeStruct,

		initCodeStructsFromService,
		createServiceDataFromCodeStructs,
	} = useCodeStructsTree(selectedCodeFile);
	// analysis config
	const { initAnalysisConfigFromService, createServiceDataFromAnalysisConfig, analysisConfig, setAnalysisConfig } =
		useConfigureAnalysis();
	// analysis message
	const {
		initAnalysisMessageFromService,
		createServiceDataFromAnalysisMessage,
		codeStructAnalysisMap,
		usedCodeStructsTreeData,
		useCodeStructsTreeData,
		setUsedCodeStructsTreeData,
		selectedCodeStructAnalysis,
	} = useAnalysisMessage(selectedCodeStruct);

	// 下载 json 文件时需要的文件名
	const analysisName = useMemo(() => {
		return getQuery("analysis_name");
	}, []);
	const codeStructsName = useMemo(() => {
		return `${analysisName}.json`;
	}, [analysisName]);
	const codeAnalysisName = useMemo(() => {
		return `${analysisName}_analysis.json`;
	}, [analysisName]);

	const providerValue = useMemo(() => {
		return {
			/** code file */
			codeFilesMap,
			codeFilesTreeData,
			codeFilesTreeExpandedKeys,
			setCodeFilesTreeExpandedKeys,
			codeFilesTreeSelectedKeys,
			setCodeFilesTreeSelectedKeys,
			selectedCodeFile,
			initCodeFilesFromFiles,
			/** code struct */
			codeStructsMap,
			allCodeStructSelectOptions,
			codeStructsTreeData,
			setCodeStructsTreeData,
			codeStructsTreeSelectedKeys,
			setCodeStructsTreeSelectedKeys,
			selectedCodeStruct,
			setSelectedCodeStruct,
			onAddNewCodeStruct,
			/** analysis config */
			initAnalysisConfigFromService,
			createServiceDataFromAnalysisConfig,
			analysisConfig,
			setAnalysisConfig,
			/** analysis message */
			codeStructAnalysisMap,
			usedCodeStructsTreeData,
			useCodeStructsTreeData,
			setUsedCodeStructsTreeData,
			selectedCodeStructAnalysis,
			/** 点击下载代码结构 */
			downloadCodeStructs() {
				downloadJSON(
					JSON.stringify({
						// CodeFilesTree 相关信息
						codeFilesTree: createServiceDataFromCodeFiles(),
						codeFileStructs: createServiceDataFromCodeStructs(),
						analysisConfig: createServiceDataFromAnalysisConfig(),
					}),
					codeStructsName
				);
			},
			/** 点击下载代码分析 */
			downloadCodeAnalysis() {
				downloadJSON(
					JSON.stringify({
						// CodeFilesTree 相关信息
						analysisMessage: createServiceDataFromAnalysisMessage(),
					}),
					codeAnalysisName
				);
			},
		};
	}, [
		allCodeStructSelectOptions,
		analysisConfig,
		codeAnalysisName,
		codeFilesMap,
		codeFilesTreeData,
		codeFilesTreeExpandedKeys,
		codeFilesTreeSelectedKeys,
		codeStructAnalysisMap,
		codeStructsMap,
		codeStructsName,
		codeStructsTreeData,
		codeStructsTreeSelectedKeys,
		createServiceDataFromAnalysisConfig,
		createServiceDataFromAnalysisMessage,
		createServiceDataFromCodeFiles,
		createServiceDataFromCodeStructs,
		initAnalysisConfigFromService,
		initCodeFilesFromFiles,
		onAddNewCodeStruct,
		selectedCodeFile,
		selectedCodeStruct,
		selectedCodeStructAnalysis,
		setAnalysisConfig,
		setCodeFilesTreeExpandedKeys,
		setCodeFilesTreeSelectedKeys,
		setCodeStructsTreeData,
		setCodeStructsTreeSelectedKeys,
		setSelectedCodeStruct,
		setUsedCodeStructsTreeData,
		useCodeStructsTreeData,
		usedCodeStructsTreeData,
	]);

	// 请求 json 数据时需要的文件名
	const analysisUrl = useMemo(() => {
		return getQuery("analysis_url");
	}, []);
	const codeStructsUrl = useMemo(() => {
		return `${analysisUrl}.json`;
	}, [analysisUrl]);
	const codeAnalysisUrl = useMemo(() => {
		return `${analysisUrl}_analysis.json`;
	}, [analysisUrl]);
	/** 初始化请求分析数据 */
	useEffect(() => {
		(async function () {
			if (codeStructsUrl) {
				const codeFilesRes = await serviceGetCodeFilesMessage(codeStructsUrl).catch((e) => {
					console.error(e);
					message.error(`代码结构信息加载失败: ${String(e)}`);
				});
				const analysisRes = await serviceGetAnalysisMessage(codeAnalysisUrl).catch((e) => {
					console.error(e);
					message.error(`代码分析信息加载失败: ${String(e)}`);
				});
				// 初始化 codeFiles
				initCodeFilesFromService(codeFilesRes?.data?.codeFilesTree ?? {});
				const _codeFileNames = Object.keys(codeFilesRes?.data?.codeFilesTree?.codeFilesMap ?? {});
				// 初始化 codeStructs
				const { codeStructsMap } = initCodeStructsFromService(
					_codeFileNames,
					codeFilesRes?.data?.codeFilesTree?.codeFilesMap ?? {},
					codeFilesRes?.data?.codeFileStructs ?? {}
				);
				// 初始化 analysis config
				initAnalysisConfigFromService(codeFilesRes?.data?.analysisConfig ?? {});
				// 初始化 analysis message
				initAnalysisMessageFromService(analysisRes?.data?.analysisMessage ?? {}, codeStructsMap);
			}
		})();
	}, [
		codeAnalysisUrl,
		codeStructsUrl,
		initAnalysisConfigFromService,
		initAnalysisMessageFromService,
		initCodeFilesFromService,
		initCodeStructsFromService,
	]);

	return (
		<AnalysisResultContext.Provider value={providerValue}>
			<AnalysisResultPage />
		</AnalysisResultContext.Provider>
	);
};

export default AnalysisResult;
