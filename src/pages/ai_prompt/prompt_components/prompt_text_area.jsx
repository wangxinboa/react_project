import React, { useCallback } from "react";
import { Button, Input, Switch } from "antd";
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
 * @param {string} props.value - 文本内容
 * @param {boolean} [props.shouldPrint=true] - 是否允许在全局打印时输出该组件
 * @param {(config: Object) => void} props.onChange - 值变化回调，参数为 { value, shouldPrint? }
 * @param {() => void} props.onDelete - 删除当前组件回调
 * @returns {JSX.Element}
 */
export const PromptTextArea = React.memo(function PromptTextArea({
	value = "",
	shouldPrint = true,
	onChange,
	onDelete,
}) {
	const handleChange = useCallback(
		(e) => {
			onChange({ value: e.target.value });
		},
		[onChange],
	);

	const handleShouldPrintChange = useCallback((checked) => onChange({ shouldPrint: checked }), [onChange]);

	return (
		<div className={styles.componentItem}>
			<div className={styles.componentHeader}>
				<span>文本域</span>
				<div className={styles.headerActions}>
					<span className={styles.switchLabel}>是否打印</span>
					<Switch size="small" checked={shouldPrint} onChange={handleShouldPrintChange} />
					<Button size="small" danger onClick={onDelete}>
						删除
					</Button>
				</div>
			</div>
			<div className={styles.promptTextArea}>
				<Input.TextArea rows={4} value={value} onChange={handleChange} />
			</div>
		</div>
	);
});
