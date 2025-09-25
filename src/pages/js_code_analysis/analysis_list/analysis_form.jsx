import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Modal, Form, Input } from "antd";

const AnalysisFormStatus = {
	Add: "Add",
	Edit: "Edit",
};
const formNameName = "name";
const formNameLabel = "项目名称";
const formUrlName = "url";
const formUrlLabel = "项目地址";

const AnalysisForm = forwardRef((props, ref) => {
	const { onAddOk, onEditOk } = props;

	const [form] = Form.useForm();

	const [visible, setVisible] = useState(null);
	const [record, setRecord] = useState(null);
	const [status, setStatus] = useState(null);
	const isAdd = status === AnalysisFormStatus.Add;
	const isEdit = status === AnalysisFormStatus.Edit;

	const handleOnOk = useCallback(() => {
		const formValues = form.getFieldsValue();
		if (isAdd) {
			onAddOk?.(formValues);
		} else if (isEdit) {
			onEditOk?.(record, formValues);
		}
		setVisible(false);
	}, [form, isAdd, isEdit, onAddOk, onEditOk, record]);
	const handleonCancel = useCallback(() => {
		setVisible(false);
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				startAddAnalysis() {
					setStatus(AnalysisFormStatus.Add);
					setVisible(true);
				},
				startEditAnalysis(record) {
					form.setFieldValue(formNameName, record[formNameName]);
					form.setFieldValue(formUrlName, record[formUrlName]);

					setRecord(record);
					setStatus(AnalysisFormStatus.Edit);
					setVisible(true);
				},
			};
		},
		[form]
	);

	return (
		<Modal
			style={{ display: "flex", flexDirection: "column" }}
			title={`${isAdd ? "新增" : "编辑"}分析代码`}
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
});

export default AnalysisForm;
