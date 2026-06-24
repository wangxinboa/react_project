// src/router/router.js

import { createHashHistory } from "history";

import AnalysisList from "../pages/js_code_analysis/analysis_list/analysis_list.jsx";
import JsCodeAnalysisResult from "../pages/js_code_analysis/js_code_analysis_result/js_code_analysis_result.jsx";
import CodeFunctionStack from "../pages/code_function_stack/code_function_stack.jsx";
import { ProjectList } from "../pages/project_manager/project_list.jsx";
import { RequirementList } from "../pages/project_manager/requirement_list.jsx";
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
export const ProjectListPage = {
	path: "/ProjectManager/ProjectList",
	label: "项目列表",
	Component: ProjectList,
};
export const RequirementListPage = {
	path: "/ProjectManager/RequirementList",
	label: "需求列表",
	Component: RequirementList,
};

export function toAnalysisContentPage(name, url) {
	history.push(`${JsCodeAnalysisResultPage.path}?analysis_name=${name}&analysis_url=${url}`);
}

export const PageItems = [
	IndexPage,
	AIPromptPage,
	AnalysisPage,
	CodeFunctionStackPage,
	ProjectListPage,
	RequirementListPage,
];

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
		key: "project-manager-sub",
		label: "项目管理",
		children: [
			{ key: ProjectListPage.path, label: ProjectListPage.label },
			{ key: RequirementListPage.path, label: RequirementListPage.label },
		],
	},
];
