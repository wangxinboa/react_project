import React, { useCallback } from "react";
import { Input } from "antd";
import styles from "./prompt_components.module.scss";

/**
 * 根据文本内容生成提示字符串
 * @param {string} value
 * @returns {string}
 */
export function generateTextAreaPromptString(value) {
	return value;
}

/**
 * 提示词文本域组件（受控）
 * @param {Object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @returns {JSX.Element}
 */
export const PromptTextArea = React.memo(function PromptTextArea({ value, onChange }) {
	const handleChange = useCallback(
		(e) => {
			onChange(e.target.value);
		},
		[onChange],
	);

	return (
		<div className={styles.promptTextArea}>
			<Input.TextArea rows={4} value={value} onChange={handleChange} />
		</div>
	);
});
