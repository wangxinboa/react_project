import { useState, useCallback } from "react";
import styles from "./code_function_stack_entry.module.scss";

export const CodeFunctionStackEntries = ({ data: childrenCodeFunctionData, level = 1 }) => {
	if (!Array.isArray(childrenCodeFunctionData) || childrenCodeFunctionData.length === 0) {
		return null;
	}

	return (
		<div className={styles.code_function_stack_children}>
			{childrenCodeFunctionData?.map((childCodeFunctionData, index) => {
				return (
					<CodeFunctionStackEntry
						key={`${childCodeFunctionData.name}_${index}`}
						data={childCodeFunctionData}
						level={level}
						index={index + 1}
					/>
				);
			})}
		</div>
	);
};

export const CodeFunctionStackEntry = ({ data: codeFunctionData, level = 1, index = 1 }) => {
	const [visible, setVisible] = useState(codeFunctionData?.visible ?? true);

	const handleOnClickVisible = useCallback(() => {
		codeFunctionData.visible = !visible;
		setVisible(!visible);
	}, [codeFunctionData, visible]);

	const toVsCode = useCallback(() => {
		if (codeFunctionData.url) {
			window.open(codeFunctionData.url);
		}
	}, [codeFunctionData.url]);

	return (
		<div className={styles.code_function_stack}>
			<div
				className={styles.code_function_stack_content}
				style={{
					top: `${(level - 1) * 25}px`,
					paddingLeft: `${level * 8}px`,
				}}
			>
				<div className={styles.code_function_stack_name} onDoubleClick={toVsCode}>
					{index}. {codeFunctionData.name}
				</div>
				<div className={styles.code_function_stack_operations}>
					<div className={styles.code_function_stack_button} onClick={handleOnClickVisible}>
						{visible ? "隐藏" : "展示"}
					</div>
				</div>
			</div>
			{visible && <CodeFunctionStackEntries data={codeFunctionData?.children} level={level + 1} />}
		</div>
	);
};
