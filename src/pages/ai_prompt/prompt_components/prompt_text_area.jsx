import { Input } from "antd";
import styles from "./prompt_components.module.scss";

/**
 * 提示词文本域组件（受控）
 * @param {Object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {(promptString: string) => void} props.onPromptChange
 */
export function PromptTextArea({ value, onChange, onPromptChange }) {
	const handleChange = (e) => {
		const text = e.target.value;
		onChange(text);
		onPromptChange(text);
	};
	return (
		<div className={styles.promptTextArea}>
			<Input.TextArea rows={4} value={value} onChange={handleChange} />
		</div>
	);
}
