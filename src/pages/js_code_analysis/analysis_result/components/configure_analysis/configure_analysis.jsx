import { useState, useCallback, forwardRef, useImperativeHandle, useMemo } from "react";
import { Modal, Form, Input } from "antd";

import styles from "./configure_analysis.module.scss";

const ConfigureAnalysis = forwardRef((props, ref) => {
	const { onOk } = props;
	const [visible, setVisible] = useState(false);

	const [form] = Form.useForm();

	const formItemsMessage = useMemo(() => {
		return {
			vsCodeUrlPrefixItemName: "vsCodeUriPrefix",
			vsCodeUrlPrefixItemLabel: "vscode 代码文件前缀",

			// sublimeUrlPrefixItemName: "sublimeUriPrefix",
			// sublimeUrlPrefixItemLabel: "sublime 代码文件前缀",
		};
	}, []);

	/** 确定 */
	const handleOnModalOK = useCallback(() => {
		onOk?.(form.getFieldsValue());
		setVisible(false);
	}, [form, onOk]);

	/** 取消 */
	const handleOnModalCancel = useCallback(() => {
		setVisible(false);
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				startConfigure(analysisConfig) {
					form.setFieldsValue(analysisConfig);
					setVisible(true);
				},
			};
		},
		[form]
	);
	return (
		<Modal
			title={"代码分析配置"}
			width={800}
			style={{ top: 40 }}
			open={visible}
			onOk={handleOnModalOK}
			onCancel={handleOnModalCancel}
		>
			<div className={styles.configure_analysis}>
				<Form form={form}>
					<Form.Item
						name={formItemsMessage.vsCodeUrlPrefixItemName}
						label={formItemsMessage.vsCodeUrlPrefixItemLabel}
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</div>
		</Modal>
	);
});

export default ConfigureAnalysis;
