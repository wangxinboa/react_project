import { createHashHistory } from "history";

import AnalysisList from "../pages/js_code_analysis/analysis_list/analysis_list.jsx";
import JsCodeAnalysisResult from "../pages/js_code_analysis/js_code_analysis_result/js_code_analysis_result.jsx";
import CodeFunctionStack from "../pages/code_function_stack/code_function_stack.jsx";

export const history = createHashHistory();

export const IndexPage = {
	Path: "/",
	Component: AnalysisList,
};

export const AnalysisListPage = {
	Path: "/JsCodeAnalysisList",
	Component: AnalysisList,
};

export const JsCodeAnalysisResultPage = {
	Path: "/JsCodeAnalysisResult",
	Component: JsCodeAnalysisResult,
};

export const CodeFunctionStackPage = {
	Path: "/CodeFunctionStack",
	Component: CodeFunctionStack,
};

export function toAnalysisContentPage(name, url) {
	history.push(`${JsCodeAnalysisResultPage.Path}?analysis_name=${name}&analysis_url=${url}`);
}

const Pages = [IndexPage, AnalysisListPage, JsCodeAnalysisResultPage, CodeFunctionStackPage];

export default Pages;
