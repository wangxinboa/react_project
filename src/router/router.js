import { createHashHistory } from "history";

import AnalysisList from "../pages/js_code_analysis/analysis_list/analysis_list.jsx";
import JsCodeAnalysisResult from "../pages/js_code_analysis/js_code_analysis_result/js_code_analysis_result.jsx";
import CodeFunctionStack from "../pages/code_function_stack/code_function_stack.jsx";
import { ProjectManager } from "../pages/project_manager/project_manager.jsx";
import { AIPrompt } from "../pages/ai_prompt/ai_prompt.jsx";

export const history = createHashHistory();

export const IndexPage = {
	path: "/",
	Component: AnalysisList,
};
export const AIPromptPage = {
	path: "/AIPrompt",
	label: "ai 提示词",
	Component: AIPrompt,
};
export const AnalysisListPage = {
	path: "/Analysis/JsCodeAnalysisList",
	label: "代码分析列表",
	Component: AnalysisList,
};
export const JsCodeAnalysisResultPage = {
	path: "/Analysis/JsCodeAnalysisResult",
	label: "代码分析结果",
	Component: JsCodeAnalysisResult,
};
export const AnalysisPage = {
	path: "/Analysis",
	label: "代码分析",
	children: [AnalysisListPage, JsCodeAnalysisResultPage],
};
export const CodeFunctionStackPage = {
	path: "/CodeFunctionStack",
	label: "代码函数栈",
	Component: CodeFunctionStack,
};
export const ProjectManagerPage = {
	path: "/ProjectManager",
	label: "项目管理",
	Component: ProjectManager,
};

export function toAnalysisContentPage(name, url) {
	history.push(`${JsCodeAnalysisResultPage.path}?analysis_name=${name}&analysis_url=${url}`);
}

export const PageItems = [IndexPage, AIPromptPage, AnalysisPage, CodeFunctionStackPage, ProjectManagerPage];
export const MenuItems = [
	{
		key: AIPromptPage.path,
		label: AIPromptPage.label,
	},
	{
		key: AnalysisListPage.path,
		label: AnalysisListPage.label,
	},
	{
		key: CodeFunctionStackPage.path,
		label: CodeFunctionStackPage.label,
	},
	{
		key: ProjectManagerPage.path,
		label: ProjectManagerPage.label,
	},
];
