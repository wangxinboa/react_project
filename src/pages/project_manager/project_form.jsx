import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Modal, Form, Input } from "antd";
import { ModalStatusTypeEnum } from "../../utils/global_constant.js";
import { ProjectFormItemNames, ProjectFormItemLabels } from "../../service/service_project_manager.js";

const labelCol = { flex: "110px" };

/**
 * 项目管理 - 新增/编辑项目表单组件
 * @component
 * @param {Object} props
 * @param {Function} props.onAddOk - 新增成功回调，参数为表单数据
 * @param {Function} props.onEditOk - 编辑成功回调，参数为 (id, 表单数据)
 */
export const ProjectForm = forwardRef((props, ref) => {
	const { onAddOk, onEditOk } = props;
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [record, setRecord] = useState(null);
	const [status, setStatus] = useState(null);

	const isAdd = status === ModalStatusTypeEnum.Add;
	const isEdit = status === ModalStatusTypeEnum.Edit;

	/**
	 * 确认按钮回调
	 * @returns {void}
	 */
	const handleOnOk = useCallback(() => {
		const formValues = form.getFieldsValue();
		if (isAdd) {
			onAddOk(formValues);
		} else if (isEdit) {
			onEditOk(record.id, formValues);
		}
		setVisible(false);
		form.resetFields();
	}, [form, isAdd, isEdit, onAddOk, onEditOk, record]);

	/**
	 * 取消按钮回调
	 * @returns {void}
	 */
	const handleOnCancel = useCallback(() => {
		setVisible(false);
		form.resetFields();
	}, [form]);

	/**
	 * 暴露给父组件的方法
	 */
	useImperativeHandle(
		ref,
		() => ({
			/**
			 * 打开新增项目对话框
			 */
			startAddProject() {
				setStatus(ModalStatusTypeEnum.Add);
				setVisible(true);
				form.resetFields();
			},
			/**
			 * 打开编辑项目对话框
			 * @param {Object} record - 要编辑的项目数据
			 */
			startEditProject(record) {
				setStatus(ModalStatusTypeEnum.Edit);
				setRecord(record);
				form.setFieldsValue({
					[ProjectFormItemNames.name]: record.name,
					[ProjectFormItemNames.gitUrl]: record.gitUrl,
					[ProjectFormItemNames.o2Url]: record.o2Url,
					[ProjectFormItemNames.comment]: record.comment,
				});
				setVisible(true);
			},
		}),
		[form],
	);

	return (
		<Modal
			style={{ display: "flex", flexDirection: "column" }}
			title={`${isAdd ? "新增" : "编辑"}项目`}
			open={visible}
			onOk={handleOnOk}
			onCancel={handleOnCancel}
		>
			<Form form={form} labelCol={labelCol}>
				<Form.Item name={ProjectFormItemNames.name} label={ProjectFormItemLabels.name} rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name={ProjectFormItemNames.gitUrl} label={ProjectFormItemLabels.gitUrl} rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name={ProjectFormItemNames.o2Url} label={ProjectFormItemLabels.o2Url}>
					<Input />
				</Form.Item>
				<Form.Item name={ProjectFormItemNames.comment} label={ProjectFormItemLabels.comment}>
					<Input.TextArea rows={3} />
				</Form.Item>
			</Form>
		</Modal>
	);
});
