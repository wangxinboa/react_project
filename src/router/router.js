import { createHashHistory } from "history";
import { ProjectList } from "../pages/project_manager/project_list.jsx";
import { RequirementList } from "../pages/project_manager/requirement_list.jsx";
import { AIPromptList } from "../pages/ai_prompt/ai_prompt_list.jsx";
import { AIPromptEditor } from "../pages/ai_prompt/ai_prompt.jsx";

export const history = createHashHistory();

export const AIPromptPage = { path: "/AIPrompt", label: "ai 提示词", Component: AIPromptList };
export const AIPromptEditorPage = { path: "/AIPrompt/Editor", Component: AIPromptEditor };

export const ProjectListPage = { path: "/ProjectManager/ProjectList", label: "项目列表", Component: ProjectList };
export const RequirementListPage = {
	path: "/ProjectManager/RequirementList",
	label: "需求列表",
	Component: RequirementList,
};

export const PageItems = [AIPromptPage, AIPromptEditorPage, ProjectListPage, RequirementListPage];
export const MenuItems = [
	{ key: AIPromptPage.path, label: AIPromptPage.label },
	{
		key: "project-manager-sub",
		label: "项目管理",
		children: [
			{ key: ProjectListPage.path, label: ProjectListPage.label },
			{ key: RequirementListPage.path, label: RequirementListPage.label },
		],
	},
];
