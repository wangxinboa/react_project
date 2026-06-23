import { createHashHistory } from "history";

import AnalysisList from "../pages/js_code_analysis/analysis_list/analysis_list.jsx";
import JsCodeAnalysisResult from "../pages/js_code_analysis/js_code_analysis_result/js_code_analysis_result.jsx";
import CodeFunctionStack from "../pages/code_function_stack/code_function_stack.jsx";

export const history = createHashHistory();

export const IndexPage = {
	key: "/",
	Com: AnalysisList,
};

export const AnalysisPage = {
	key: "/Analysis",
	label: "代码分析",
	children: [
		{
			key: "JsCodeAnalysisList",
			path: "/Analysis/JsCodeAnalysisList",
			label: "代码分析列表",
			Com: AnalysisList,
		},
		{
			key: "JsCodeAnalysisResult",
			path: "/Analysis/JsCodeAnalysisResult",
			label: "代码分析结果",
			Com: JsCodeAnalysisResult,
		},
	],
};

export const CodeFunctionStackPage = {
	key: "/CodeFunctionStack",
	label: "代码函数栈",
	Com: CodeFunctionStack,
};

export function toAnalysisContentPage(name, url) {
	history.push(`${AnalysisPage.children[0].key}?analysis_name=${name}&analysis_url=${url}`);
}

export const Pages = [IndexPage, AnalysisPage, CodeFunctionStackPage];
export const PagesItems = [AnalysisPage, CodeFunctionStackPage];
