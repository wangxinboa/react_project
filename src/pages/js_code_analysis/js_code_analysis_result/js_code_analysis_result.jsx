import { useMemo, createContext, useEffect } from "react";
import { message } from "antd";

import JsCodeAnalysisResultPage from "./js_code_analysis_result_page.jsx";

// import useCodeFilesTree from "./components/code_files_tree/use_code_files_tree.js";
// import useCodeStructsTree from "./components/code_structs_tree/use_code_structs_tree.js";
// import useConfigureAnalysis from "./components/configure_analysis/use_configure_analysis.js";
// import useAnalysisMessage from "./components/analysis_message/use_analysis_message.js";

import { getQuery, downloadJSON } from "../../../utils/utils.js";
import { serviceGetCodeFilesMessage, serviceGetAnalysisMessage } from "../../../service/service_analysis_result.js";

export const JsCodeJsCodeAnalysisResultContext = createContext();

const JsCodeAnalysisResult = () => {
	// code files

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
		return {};
	}, []);

	return (
		<JsCodeJsCodeAnalysisResultContext.Provider value={providerValue}>
			<JsCodeAnalysisResultPage />
		</JsCodeJsCodeAnalysisResultContext.Provider>
	);
};

export default JsCodeAnalysisResult;
