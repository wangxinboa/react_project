import { useState, useCallback, forwardRef, useImperativeHandle, useMemo } from "react";
import { Modal, Form, Input, Button, message } from "antd";

import styles from "./configure_analysis.module.scss";

const ConfigureAnalysis = forwardRef((props, ref) => {
	const { onOk } = props;
	const [visible, setVisible] = useState(false);

	const [form] = Form.useForm();

	const formItemsMessage = useMemo(() => {
		return {
			vsCodeUrlPrefixItemName: "vsCodeUriPrefix",
			vsCodeUrlPrefixItemLabel: "vscode 代码文件前缀",

			importPackageSourcePathsName: "importPackageSourcePaths",

			importPackageSourceLabel: "包名",
			importPackageSourceName: "importPackageSource",
			importPackageSourcePathLabel: "路径名",
			importPackageSourcePathName: "importPackageSourcePath",

			// sublimeUrlPrefixItemName: "sublimeUriPrefix",
			// sublimeUrlPrefixItemLabel: "sublime 代码文件前缀",
		};
	}, []);
	/** import source 包对应的路径 */
	const importPackageSourceItemLayout = useMemo(() => {
		return {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
		};
	}, []);

	/** 确定 */
	const handleOnModalOK = useCallback(async () => {
		try {
			const value = await form.validateFields();
			onOk?.(value);
			setVisible(false);
		} catch (e) {
			message.error("输入信息有误");
		}
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
						rules={[{ required: true, message: "请输入 vscode 代码文件前缀" }]}
					>
						<Input />
					</Form.Item>
					<Form.List name={formItemsMessage.importPackageSourcePathsName} required={false}>
						{(fields, { add, remove }) => (
							<>
								{fields.map((field, index) => {
									return (
										<div key={field.key} className={styles.configure_analysis_import_source_container}>
											<Form.Item
												className={styles.configure_analysis_import_source}
												labelCol={importPackageSourceItemLayout.labelCol}
												{...field.restField}
												label={index === 0 ? formItemsMessage.importPackageSourceLabel : " "}
												colon={false}
												name={[field.name, formItemsMessage.importPackageSourceName]}
												rules={[{ required: true, message: "请输入包名" }]}
											>
												<Input placeholder="请输入包名" />
											</Form.Item>
											<Form.Item
												className={styles.configure_analysis_import_source_path}
												labelCol={importPackageSourceItemLayout.labelCol}
												{...field.restField}
												label={index === 0 ? formItemsMessage.importPackageSourcePathLabel : " "}
												colon={false}
												name={[field.name, formItemsMessage.importPackageSourcePathName]}
												rules={[{ required: true, message: "请输入别名" }]}
											>
												<Input placeholder="请输入别名" />
											</Form.Item>
										</div>
									);
								})}
								<Form.Item>
									<Button type="dashed" onClick={() => add()} block>
										添加依赖包路径信息
									</Button>
								</Form.Item>
							</>
						)}
						{/* {
							(fields, { add, remove }) => (
								<>
									{
										fields.map(({ key, name, ...restField })=> (

              <Form.Item
                {...restField}
                name={[name, 'first']}
                rules={[{ required: true, message: 'Missing first name' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
										)
									}
								</>
							)
						} */}
					</Form.List>
				</Form>
			</div>
		</Modal>
	);
});

export default ConfigureAnalysis;
