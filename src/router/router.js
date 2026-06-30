import { createHashHistory } from "history";
import { ProjectList } from "../pages/project_manager/project_list.jsx";
import { RequirementList } from "../pages/project_manager/requirement_list.jsx";
import { AIPromptList } from "../pages/ai_prompt/ai_prompt_list.jsx";
import { AIPrompt } from "../pages/ai_prompt/ai_prompt.jsx";
import { SpriteSheet } from "../pages/sprite_sheet/sprite_sheet.jsx";

export const history = createHashHistory();

export const AIPromptPage = { path: "/AIPrompt", label: "ai 提示词", Component: AIPromptList };
export const AIPromptEditorPage = { path: "/AIPrompt/Editor", Component: AIPrompt };
export const ProjectListPage = { path: "/ProjectManager/ProjectList", label: "项目列表", Component: ProjectList };
export const RequirementListPage = {
	path: "/ProjectManager/RequirementList",
	label: "需求列表",
	Component: RequirementList,
};
export const SpriteSheetPage = { path: "/SpriteSheet", label: "Sprite Sheet 测试", Component: SpriteSheet };

/** 跳转到新建/编辑提示词页面，id 为空则为新建 */
export function toAIPromptEditor(id) {
	const path = id ? `/AIPrompt/Editor?id=${id}` : "/AIPrompt/Editor";
	history.push(path);
}

export const PageItems = [AIPromptPage, AIPromptEditorPage, ProjectListPage, RequirementListPage, SpriteSheetPage];
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
	{ key: SpriteSheetPage.path, label: SpriteSheetPage.label },
];
