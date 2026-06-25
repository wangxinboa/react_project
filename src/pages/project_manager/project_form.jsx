import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Modal, Form, Input } from "antd";
import { ModalStatusTypeEnum } from "../../utils/global_constant.js";
import {
	ProjectFormItemNames,
	ProjectFormItemLabels,
} from "../../service/project_manager/project_manager_constants.js";
import { UrlFormItem } from "../../components/url_form_item/url_form_item.jsx";

const labelCol = { flex: "110px" };

/**
 * 标题映射
 */
const MODAL_TITLE_MAP = {
	[ModalStatusTypeEnum.Add]: "新增项目",
	[ModalStatusTypeEnum.Edit]: "编辑项目",
	[ModalStatusTypeEnum.View]: "查看项目",
};

/**
 * 项目管理 - 新增/编辑/查看项目表单组件
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
	const isView = status === ModalStatusTypeEnum.View;

	const modalTitle = MODAL_TITLE_MAP[status] || "";

	/**
	 * 填充项目表单数据
	 * @param {Object} data - 项目数据
	 */
	const setProjectFormValues = useCallback(
		(data) => {
			form.setFieldsValue({
				[ProjectFormItemNames.name]: data.name,
				[ProjectFormItemNames.gitUrl]: data.gitUrl,
				[ProjectFormItemNames.o2Url]: data.o2Url,
				[ProjectFormItemNames.comment]: data.comment,
			});
		},
		[form],
	);

	/**
	 * 确认按钮回调
	 * @returns {void}
	 */
	const handleOnOk = useCallback(() => {
		if (isView) {
			setVisible(false);
			form.resetFields();
			return;
		}
		const formValues = form.getFieldsValue();
		if (isAdd) {
			onAddOk(formValues);
		} else if (isEdit) {
			onEditOk(record.id, formValues);
		}
		setVisible(false);
		form.resetFields();
	}, [form, isAdd, isEdit, isView, onAddOk, onEditOk, record]);

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
			startAddProject() {
				setStatus(ModalStatusTypeEnum.Add);
				setVisible(true);
				form.resetFields();
			},
			startEditProject(record) {
				setStatus(ModalStatusTypeEnum.Edit);
				setRecord(record);
				setProjectFormValues(record);
				setVisible(true);
			},
			startViewProject(record) {
				setStatus(ModalStatusTypeEnum.View);
				setRecord(record);
				setProjectFormValues(record);
				setVisible(true);
			},
		}),
		[form, setProjectFormValues],
	);

	const gitUrl = record ? record.gitUrl : "";
	const o2Url = record ? record.o2Url : "";

	return (
		<Modal
			style={{ display: "flex", flexDirection: "column" }}
			title={modalTitle}
			open={visible}
			onOk={handleOnOk}
			onCancel={handleOnCancel}
			okButtonProps={{ style: isView ? { display: "none" } : {} }}
			cancelText={isView ? "关闭" : "取消"}
		>
			<Form form={form} labelCol={labelCol}>
				{!(isView && !record?.name) && (
					<Form.Item
						name={ProjectFormItemNames.name}
						label={ProjectFormItemLabels.name}
						rules={[{ required: !isView }]}
					>
						{isView ? <span>{record.name}</span> : <Input />}
					</Form.Item>
				)}
				<UrlFormItem
					isView={isView}
					url={gitUrl}
					name={ProjectFormItemNames.gitUrl}
					label={ProjectFormItemLabels.gitUrl}
				/>
				<UrlFormItem
					isView={isView}
					url={o2Url}
					name={ProjectFormItemNames.o2Url}
					label={ProjectFormItemLabels.o2Url}
				/>
				{!(isView && !record?.comment) && (
					<Form.Item name={ProjectFormItemNames.comment} label={ProjectFormItemLabels.comment}>
						{isView ? <span>{record.comment}</span> : <Input.TextArea rows={3} />}
					</Form.Item>
				)}
			</Form>
		</Modal>
	);
});
