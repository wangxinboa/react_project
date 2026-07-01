import { forwardRef, useCallback, useImperativeHandle, useState, useMemo } from "react";
import { Drawer, Form, Input, Select, Button } from "antd";
import dayjs from "dayjs";
import { ModalStatusTypeEnum } from "../../../utils/global_constant.js";
import {
	RequirementFormItemNames,
	RequirementFormItemLabels,
	RequirementStatusEnum,
} from "../../../services/project_manager/project_manager_constants.js";
import { CUrlFormItem } from "../../../components/c_url_form_item/c_url_form_item.jsx";
import { CTimestampDatePicker } from "../../../components/c_timestamp_date_picker/c_timestamp_date_picker.jsx";
import { ProjectItemsForm } from "./project_items_form.jsx";
import styles from "../project_manager.module.scss";

const { Option } = Select;
const labelCol = { flex: "110px" };

const ModalTitleMap = {
	[ModalStatusTypeEnum.Add]: "新增需求",
	[ModalStatusTypeEnum.Edit]: "编辑需求",
	[ModalStatusTypeEnum.View]: "查看需求",
};

function formatTs(ts) {
	if (!ts) return "";
	return dayjs(ts).format("YYYY-MM-DD");
}

export const RequirementForm = forwardRef((props, ref) => {
	const { onAddOk, onEditOk, projects } = props;
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [record, setRecord] = useState(null);
	const [status, setStatus] = useState(null);

	const isAdd = status === ModalStatusTypeEnum.Add;
	const isEdit = status === ModalStatusTypeEnum.Edit;
	const isView = status === ModalStatusTypeEnum.View;
	const modalTitle = ModalTitleMap[status] || "";

	const projectOptions = useMemo(() => {
		const options = [];
		for (let i = 0; i < projects.length; i++) {
			options.push({
				value: projects[i].id,
				label: projects[i].name,
			});
		}
		return options;
	}, [projects]);

	const setRequirementFormValues = useCallback(
		(data) => {
			form.setFieldsValue({
				[RequirementFormItemNames.name]: data.name,
				[RequirementFormItemNames.projectItems]: data.projectItems || [],
				[RequirementFormItemNames.aoneUrl]: data.aoneUrl,
				[RequirementFormItemNames.prdUrl]: data.prdUrl,
				[RequirementFormItemNames.designUrl]: data.designUrl,
				[RequirementFormItemNames.testUrl]: data.testUrl,
				[RequirementFormItemNames.iterationUrl]: data.iterationUrl,
				[RequirementFormItemNames.devTime]: data.devTime,
				[RequirementFormItemNames.testTime]: data.testTime,
				[RequirementFormItemNames.onlineTime]: data.onlineTime,
				[RequirementFormItemNames.status]: data.status,
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
		form.validateFields().then((values) => {
			const formData = { ...values };
			if (isAdd) {
				onAddOk(formData);
			} else if (isEdit) {
				onEditOk(record.id, formData);
			}
			setVisible(false);
			form.resetFields();
		});
	}, [form, isAdd, isEdit, isView, onAddOk, onEditOk, record]);

	const handleOnCancel = useCallback(() => {
		setVisible(false);
		form.resetFields();
	}, [form]);

	useImperativeHandle(
		ref,
		() => ({
			startAddRequirement() {
				setStatus(ModalStatusTypeEnum.Add);
				setVisible(true);
				form.resetFields();
				form.setFieldsValue({
					[RequirementFormItemNames.status]: RequirementStatusEnum.pending,
					[RequirementFormItemNames.projectItems]: [],
				});
			},
			startEditRequirement(record) {
				setStatus(ModalStatusTypeEnum.Edit);
				setRecord(record);
				setRequirementFormValues(record);
				setVisible(true);
			},
			startViewRequirement(record) {
				setStatus(ModalStatusTypeEnum.View);
				setRecord(record);
				setRequirementFormValues(record);
				setVisible(true);
			},
		}),
		[form, setRequirementFormValues],
	);

	const aoneUrl = record ? record.aoneUrl : "";
	const prdUrl = record ? record.prdUrl : "";
	const designUrl = record ? record.designUrl : "";
	const testUrl = record ? record.testUrl : "";
	const iterationUrl = record ? record.iterationUrl : "";

	return (
		<Drawer
			title={modalTitle}
			placement="right"
			size={700}
			open={visible}
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
						name={RequirementFormItemNames.name}
						label={RequirementFormItemLabels.name}
						rules={[{ required: !isView }]}
					>
						{isView ? <span>{record.name}</span> : <Input />}
					</Form.Item>
				)}

				<ProjectItemsForm
					isView={isView}
					projectOptions={projectOptions}
					value={record?.projectItems}
					name={RequirementFormItemNames.projectItems}
					label={RequirementFormItemLabels.projectItems}
				/>

				<CUrlFormItem
					isView={isView}
					url={aoneUrl}
					name={RequirementFormItemNames.aoneUrl}
					label={RequirementFormItemLabels.aoneUrl}
				/>
				<CUrlFormItem
					isView={isView}
					url={prdUrl}
					name={RequirementFormItemNames.prdUrl}
					label={RequirementFormItemLabels.prdUrl}
				/>
				<CUrlFormItem
					isView={isView}
					url={designUrl}
					name={RequirementFormItemNames.designUrl}
					label={RequirementFormItemLabels.designUrl}
				/>
				<CUrlFormItem
					isView={isView}
					url={testUrl}
					name={RequirementFormItemNames.testUrl}
					label={RequirementFormItemLabels.testUrl}
				/>
				<CUrlFormItem
					isView={isView}
					url={iterationUrl}
					name={RequirementFormItemNames.iterationUrl}
					label={RequirementFormItemLabels.iterationUrl}
				/>
				{!(isView && !record?.devTime) && (
					<Form.Item
						name={RequirementFormItemNames.devTime}
						label={RequirementFormItemLabels.devTime}
						rules={[{ required: !isView }]}
					>
						{isView ? <span>{formatTs(record.devTime)}</span> : <CTimestampDatePicker />}
					</Form.Item>
				)}
				{!(isView && !record?.testTime) && (
					<Form.Item name={RequirementFormItemNames.testTime} label={RequirementFormItemLabels.testTime}>
						{isView ? <span>{formatTs(record.testTime)}</span> : <CTimestampDatePicker />}
					</Form.Item>
				)}
				{!(isView && !record?.onlineTime) && (
					<Form.Item name={RequirementFormItemNames.onlineTime} label={RequirementFormItemLabels.onlineTime}>
						{isView ? <span>{formatTs(record.onlineTime)}</span> : <CTimestampDatePicker />}
					</Form.Item>
				)}
				{!(isView && !record?.status) && (
					<Form.Item
						name={RequirementFormItemNames.status}
						label={RequirementFormItemLabels.status}
						rules={[{ required: !isView }]}
					>
						{isView ? (
							<span>{record.status}</span>
						) : (
							<Select>
								<Option value={RequirementStatusEnum.pending}>{RequirementStatusEnum.pending}</Option>
								<Option value={RequirementStatusEnum.developing}>{RequirementStatusEnum.developing}</Option>
								<Option value={RequirementStatusEnum.debugging}>{RequirementStatusEnum.debugging}</Option>
								<Option value={RequirementStatusEnum.testing}>{RequirementStatusEnum.testing}</Option>
								<Option value={RequirementStatusEnum.online}>{RequirementStatusEnum.online}</Option>
							</Select>
						)}
					</Form.Item>
				)}
			</Form>
		</Drawer>
	);
});
