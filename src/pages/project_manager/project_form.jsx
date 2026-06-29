import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Drawer, Form, Input, Button } from "antd";
import { ModalStatusTypeEnum } from "../../utils/global_constant.js";
import {
	ProjectFormItemNames,
	ProjectFormItemLabels,
} from "../../services/project_manager/project_manager_constants.js";
import { CUrlFormItem } from "../../components/c_url_form_item/c_url_form_item.jsx";
import styles from "./project_manager.module.scss";

const labelCol = { flex: "110px" };

const ModalTitleMap = {
	[ModalStatusTypeEnum.Add]: "新增项目",
	[ModalStatusTypeEnum.Edit]: "编辑项目",
	[ModalStatusTypeEnum.View]: "查看项目",
};

/**
 * 项目管理 - 新增/编辑/查看项目表单组件
 * @param {Object} props
 * @param {Function} props.onAddOk - 新增成功回调，参数为表单数据
 * @param {Function} props.onEditOk - 编辑成功回调，参数为 (id, 表单数据)
 * @param {React.Ref} ref
 * @returns {JSX.Element}
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
	const modalTitle = ModalTitleMap[status] || "";

	const setProjectFormValues = useCallback(
		(data) => {
			form.setFieldsValue({
				[ProjectFormItemNames.name]: data.name,
				[ProjectFormItemNames.gitUrl]: data.gitUrl,
				[ProjectFormItemNames.o2Url]: data.o2Url,
			});
		},
		[form],
	);

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

	const handleOnCancel = useCallback(() => {
		setVisible(false);
		form.resetFields();
	}, [form]);

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
		<Drawer
			title={modalTitle}
			placement="right"
			open={visible}
			size={700}
			onClose={handleOnCancel}
			footer={
				<div className={styles.drawerFooter}>
					{isView ? (
						<Button onClick={handleOnCancel}>关闭</Button>
					) : (
						<>
							<Button onClick={handleOnCancel}>取消</Button>
							<Button type="primary" onClick={handleOnOk} style={{ marginLeft: 8 }}>
								确定
							</Button>
						</>
					)}
				</div>
			}
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
				<CUrlFormItem
					isView={isView}
					url={gitUrl}
					name={ProjectFormItemNames.gitUrl}
					label={ProjectFormItemLabels.gitUrl}
				/>
				<CUrlFormItem
					isView={isView}
					url={o2Url}
					name={ProjectFormItemNames.o2Url}
					label={ProjectFormItemLabels.o2Url}
				/>
			</Form>
		</Drawer>
	);
});
