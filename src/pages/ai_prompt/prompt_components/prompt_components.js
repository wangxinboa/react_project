import { PromptCodeTree } from "./prompt_code_tree.jsx";
import { PromptTextArea } from "./prompt_text_area.jsx";

export const PromptComponentType = {
	CodeTree: "codeTree",
	TextArea: "textarea",
};

export const PromptComponentMap = {
	[PromptComponentType.CodeTree]: PromptCodeTree,
	[PromptComponentType.TextArea]: PromptTextArea,
};
