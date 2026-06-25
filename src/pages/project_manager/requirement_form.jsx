import { forwardRef, useCallback, useImperativeHandle, useState, useMemo } from "react";
import { Modal, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { ModalStatusTypeEnum } from "../../utils/global_constant.js";
import {
	RequirementFormItemNames,
	RequirementFormItemLabels,
	RequirementStatusEnum,
} from "../../service/project_manager/project_manager_constants.js";
import { UrlFormItem } from "../../components/url_form_item/url_form_item.jsx";
import { TimestampDatePicker } from "../../components/timestamp_date_picker/timestamp_date_picker.jsx";

import styles from "./project_manager.module.scss";

const { Option } = Select;
const labelCol = { flex: "110px" };

/**
 * 标题映射
 */
const ModalTitleMap = {
	[ModalStatusTypeEnum.Add]: "新增需求",
	[ModalStatusTypeEnum.Edit]: "编辑需求",
	[ModalStatusTypeEnum.View]: "查看需求",
};

/**
 * 格式化时间戳为日期字符串（查看模式）
 * @param {number} ts - 时间戳
 * @returns {string}
 */
function formatTs(ts) {
	if (!ts) return "";
	return dayjs(ts).format("YYYY-MM-DD");
}

/**
 * 需求管理 - 新增/编辑/查看需求表单组件
 * @component
 * @param {Object} props
 * @param {Function} props.onAddOk - 新增成功回调，参数为表单数据（日期为时间戳）
 * @param {Function} props.onEditOk - 编辑成功回调，参数为 (id, 表单数据)
 * @param {Array} props.projects - 所有项目的列表，用于关联项目下拉选择
 */
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

	/**
	 * 生成项目下拉选项
	 * @returns {Array<{value: number, label: string}>}
	 */
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

	/**
	 * 填充需求表单数据（时间戳直接作为 value）
	 * @param {Object} data - 需求数据
	 */
	const setRequirementFormValues = useCallback(
		(data) => {
			form.setFieldsValue({
				[RequirementFormItemNames.name]: data.name,
				[RequirementFormItemNames.projectIds]: data.projectIds,
				[RequirementFormItemNames.aoneUrl]: data.aoneUrl,
				[RequirementFormItemNames.prdUrl]: data.prdUrl,
				[RequirementFormItemNames.designUrl]: data.designUrl,
				[RequirementFormItemNames.testUrl]: data.testUrl,
				[RequirementFormItemNames.crUrl]: data.crUrl,
				[RequirementFormItemNames.iterationUrl]: data.iterationUrl,
				[RequirementFormItemNames.devTime]: data.devTime,
				[RequirementFormItemNames.testTime]: data.testTime,
				[RequirementFormItemNames.onlineTime]: data.onlineTime,
				[RequirementFormItemNames.status]: data.status,
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
			startAddRequirement() {
				setStatus(ModalStatusTypeEnum.Add);
				setVisible(true);
				form.resetFields();
				form.setFieldsValue({
					[RequirementFormItemNames.status]: RequirementStatusEnum.pending,
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
	const crUrl = record ? record.crUrl : "";
	const iterationUrl = record ? record.iterationUrl : "";

	return (
		<Modal
			className={styles.requirementFormWrapper}
			title={modalTitle}
			open={visible}
			onOk={handleOnOk}
			onCancel={handleOnCancel}
			width={700}
			centered
			okButtonProps={{ style: isView ? { display: "none" } : {} }}
			cancelText={isView ? "关闭" : "取消"}
		>
			<Form className={styles.requirementForm} form={form} labelCol={labelCol}>
				{!(isView && !record?.name) && (
					<Form.Item
						name={RequirementFormItemNames.name}
						label={RequirementFormItemLabels.name}
						rules={[{ required: !isView }]}
					>
						{isView ? <span>{record.name}</span> : <Input />}
					</Form.Item>
				)}
				{!(isView && (!record?.projectIds || record.projectIds.length === 0)) && (
					<Form.Item name={RequirementFormItemNames.projectIds} label={RequirementFormItemLabels.projectIds}>
						{isView ? (
							<span>
								{projectOptions
									.filter((opt) => record.projectIds.includes(opt.value))
									.map((opt) => opt.label)
									.join(", ")}
							</span>
						) : (
							<Select mode="multiple" placeholder="请选择关联项目" options={projectOptions} />
						)}
					</Form.Item>
				)}
				<UrlFormItem
					isView={isView}
					url={aoneUrl}
					name={RequirementFormItemNames.aoneUrl}
					label={RequirementFormItemLabels.aoneUrl}
				/>
				<UrlFormItem
					isView={isView}
					url={prdUrl}
					name={RequirementFormItemNames.prdUrl}
					label={RequirementFormItemLabels.prdUrl}
				/>
				<UrlFormItem
					isView={isView}
					url={designUrl}
					name={RequirementFormItemNames.designUrl}
					label={RequirementFormItemLabels.designUrl}
				/>
				<UrlFormItem
					isView={isView}
					url={testUrl}
					name={RequirementFormItemNames.testUrl}
					label={RequirementFormItemLabels.testUrl}
				/>
				<UrlFormItem
					isView={isView}
					url={crUrl}
					name={RequirementFormItemNames.crUrl}
					label={RequirementFormItemLabels.crUrl}
				/>
				<UrlFormItem
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
						{isView ? <span>{formatTs(record.devTime)}</span> : <TimestampDatePicker />}
					</Form.Item>
				)}
				{!(isView && !record?.testTime) && (
					<Form.Item name={RequirementFormItemNames.testTime} label={RequirementFormItemLabels.testTime}>
						{isView ? <span>{formatTs(record.testTime)}</span> : <TimestampDatePicker />}
					</Form.Item>
				)}
				{!(isView && !record?.onlineTime) && (
					<Form.Item name={RequirementFormItemNames.onlineTime} label={RequirementFormItemLabels.onlineTime}>
						{isView ? <span>{formatTs(record.onlineTime)}</span> : <TimestampDatePicker />}
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
		</Modal>
	);
});
