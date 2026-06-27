import { PromptCodeTree, generateCodeTreePromptString } from "./prompt_code_tree.jsx";
import { PromptTextArea, generateTextAreaPromptString } from "./prompt_text_area.jsx";

/**
 * 提示词组件类型常量
 */
export const PromptComponentType = {
	CodeTree: "codeTree",
	TextArea: "textarea",
};

/**
 * 提示词组件映射表
 */
export const PromptComponentMap = {
	[PromptComponentType.CodeTree]: PromptCodeTree,
	[PromptComponentType.TextArea]: PromptTextArea,
};

/**
 * 根据组件类型和 props 生成提示字符串
 * @param {string} type - 组件类型，来自 PromptComponentType
 * @param {Object} props - 组件当前的 props，已包含 codeFilesMap、checkedKeys 等
 * @returns {string} 生成的提示字符串
 */
export function generatePromptStringByType(type, props) {
	if (type === PromptComponentType.CodeTree) {
		const { checkedKeys = [], codeFilesMap = {} } = props;
		return generateCodeTreePromptString(checkedKeys, codeFilesMap);
	}
	if (type === PromptComponentType.TextArea) {
		return generateTextAreaPromptString(props.value || "");
	}
	return "";
}
