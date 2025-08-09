import { useCallback, useEffect } from "react";
import { Modal, Form, Input } from "antd";

const formNameName = "name";
const formNameLabel = "项目名称";
const formUrlName = "url";
const formUrlLabel = "项目地址";

export default function AnalysisForm(props) {
	const { data, visible, setVisible, onOk } = props;

	const [form] = Form.useForm();

	const handleOnOk = useCallback(() => {
		onOk(form.getFieldsValue());
		setVisible(false);
	}, [form, onOk, setVisible]);
	const handleonCancel = useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	useEffect(() => {
		if (data) {
			form.setFieldValue(formNameName, data[formNameName]);
			form.setFieldValue(formUrlName, data[formUrlName]);
		}
	}, [data, form]);

	return (
		<Modal
			style={{ display: "flex", flexDirection: "column" }}
			title={`${data ? "编辑" : "新增"}分析代码`}
			open={visible}
			onOk={handleOnOk}
			onCancel={handleonCancel}
		>
			<Form form={form}>
				<Form.Item name={formNameName} label={formNameLabel} rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name={formUrlName} label={formUrlLabel} rules={[{ required: true }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
}
