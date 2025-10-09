import { useMemo, createContext, useEffect } from "react";
import { message } from "antd";

import JsCodeAnalysisResultPage from "./js_code_analysis_result_page.jsx";

import useJsCodeStructsTree from "./components/js_code_structs_tree/use_js_code_structs_tree.js";
import useCodeFilesTree from "./components/code_files_tree/use_code_files_tree.js";
// import useCodeStructsTree from "./components/code_structs_tree/use_code_structs_tree.js";
// import useConfigureAnalysis from "./components/configure_analysis/use_configure_analysis.js";
// import useAnalysisMessage from "./components/analysis_message/use_analysis_message.js";

import { getQuery, downloadJSON } from "../../../utils/utils.js";
import { serviceGetCodeFilesMessage } from "../../../service/service_analysis_result.js";
import useConfigureAnalysis from "./components/configure_analysis/use_configure_analysis.js";

export const JsCodeJsCodeAnalysisResultContext = createContext();

const JsCodeAnalysisResult = () => {
	// analysis config
	const {
		initAnalysisConfigFromService,
		createServiceDataFromAnalysisConfig,
		analysisConfig,
		setAnalysisConfig,
		toVsCodeFile,
	} = useConfigureAnalysis();
	// js code structs
	const {
		codeStructsMap,
		codeStructsTreeData,
		codeStructsTreeSelectedKeys,
		onSetCodeStructsTreeSelectedKeys,

		setSelectedCodeStructByCodeFile,
		selectedCodeStruct,
	} = useJsCodeStructsTree();
	// code files
	const {
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
	} = useCodeFilesTree(setSelectedCodeStructByCodeFile);

	const providerValue = useMemo(() => {
		return {
			// analysis config
			initAnalysisConfigFromService,
			analysisConfig,
			setAnalysisConfig,
			toVsCodeFile,
			// js code structs
			codeStructsMap,
			codeStructsTreeData,
			codeStructsTreeSelectedKeys,

			onSetCodeStructsTreeSelectedKeys,
			selectedCodeStruct,
			// code files
			codeFilesMap,

			codeFilesTreeData,
			codeFilesTreeExpandedKeys,
			setCodeFilesTreeExpandedKeys,
			codeFilesTreeSelectedKeys,
			onSetCodeFilesTreeSelectedKeys,

			initCodeFilesByFiles,
			initCodeFilesByService,
			selectedCodeFile,

			/** 点击下载代码文件信息 */
			downloadCodeFilesMessage() {
				downloadJSON(
					JSON.stringify({
						analysisConfig: createServiceDataFromAnalysisConfig(),
						// CodeFilesTree 相关信息
						codeFilesTree: createServiceDataByCodeFiles(),
						// codeFileStructs: createServiceDataByCodeStructs(),
					}),
					`${getQuery("analysis_name")}.json`
				);
			},
		};
	}, [
		analysisConfig,
		codeFilesMap,
		codeFilesTreeData,
		codeFilesTreeExpandedKeys,
		codeFilesTreeSelectedKeys,
		codeStructsMap,
		codeStructsTreeData,
		codeStructsTreeSelectedKeys,
		createServiceDataByCodeFiles,
		createServiceDataFromAnalysisConfig,
		initAnalysisConfigFromService,
		initCodeFilesByFiles,
		initCodeFilesByService,
		onSetCodeFilesTreeSelectedKeys,
		onSetCodeStructsTreeSelectedKeys,
		selectedCodeFile,
		selectedCodeStruct,
		setAnalysisConfig,
		setCodeFilesTreeExpandedKeys,
		toVsCodeFile,
	]);

	/** 初始化请求分析数据 */
	useEffect(() => {
		// 请求保存代码信息的 json 数据
		serviceGetCodeFilesMessage(`${getQuery("analysis_url")}.json`)
			.then((res) => {
				initCodeFilesByService(res.data.codeFilesTree ?? {});
				// 初始化 analysis config
				initAnalysisConfigFromService(res.data.analysisConfig ?? {});
			})
			.catch((e) => {
				console.error(e);
				message.error(`代码结构信息加载失败: ${String(e)}`);
			});
	}, [initAnalysisConfigFromService, initCodeFilesByService]);

	return (
		<JsCodeJsCodeAnalysisResultContext.Provider value={providerValue}>
			<JsCodeAnalysisResultPage />
		</JsCodeJsCodeAnalysisResultContext.Provider>
	);
};

export default JsCodeAnalysisResult;
