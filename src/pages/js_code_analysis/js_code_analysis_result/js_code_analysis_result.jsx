import { useMemo, createContext, useEffect } from "react";
import { message } from "antd";

import JsCodeAnalysisResultPage from "./js_code_analysis_result_page.jsx";

import useJsCodeAnalysis from "./components/js_code_analysis/use_js_code_analysis.js";
import useCodeFilesTree from "./components/code_files_tree/use_code_files_tree.js";

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
		setAnalysisConfigFromFormData,
		toVsCodeFile,
		setEntryExecutionFileKey,
	} = useConfigureAnalysis();
	// js code analysis
	const {
		astRelationManager,
		codeStructsTreeData,
		selectedCodeFileStruct,

		createAllStructsByAllCodeFiles,
		setSelectedCodeStructByCodeFile,
		executeCodeFile,
	} = useJsCodeAnalysis(analysisConfig);
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
			setAnalysisConfigFromFormData,
			toVsCodeFile,
			setEntryExecutionFileKey,
			// js code analysis
			astRelationManager,
			codeStructsTreeData,
			selectedCodeFileStruct,

			createAllStructsByAllCodeFiles,
			executeCodeFile,
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
		astRelationManager,
		codeFilesMap,
		codeFilesTreeData,
		codeFilesTreeExpandedKeys,
		codeFilesTreeSelectedKeys,
		codeStructsTreeData,
		createAllStructsByAllCodeFiles,
		executeCodeFile,
		createServiceDataByCodeFiles,
		createServiceDataFromAnalysisConfig,
		initAnalysisConfigFromService,
		initCodeFilesByFiles,
		initCodeFilesByService,
		onSetCodeFilesTreeSelectedKeys,
		selectedCodeFile,
		selectedCodeFileStruct,
		setAnalysisConfigFromFormData,
		setCodeFilesTreeExpandedKeys,
		setEntryExecutionFileKey,
		toVsCodeFile,
	]);

	/** 初始化请求分析数据 */
	useEffect(() => {
		// 请求保存代码信息的 json 数据
		serviceGetCodeFilesMessage(`${getQuery("analysis_url")}.json`)
			.then(async (res) => {
				// 初始化 analysis config
				initAnalysisConfigFromService(res.data.analysisConfig ?? {});

				const rootCodeFolder = initCodeFilesByService(res.data.codeFilesTree ?? {});
				createAllStructsByAllCodeFiles(rootCodeFolder.allFiles);

				const entryExecutionFile = rootCodeFolder.codeFilesMap[res.data.analysisConfig.entryExecutionFileKey];
				if (entryExecutionFile) {
					await executeCodeFile(entryExecutionFile);
				}
			})
			.catch((e) => {
				console.error(e);
				message.error(`代码结构信息加载失败: ${String(e)}`);
			});
	}, [createAllStructsByAllCodeFiles, executeCodeFile, initAnalysisConfigFromService, initCodeFilesByService]);

	return (
		<JsCodeJsCodeAnalysisResultContext.Provider value={providerValue}>
			<JsCodeAnalysisResultPage />
		</JsCodeJsCodeAnalysisResultContext.Provider>
	);
};

export default JsCodeAnalysisResult;
