// src/pages/project_manager/requirement_form.jsx

import { forwardRef, useCallback, useImperativeHandle, useState, useMemo } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs"; // 新增导入
import { ModalStatusTypeEnum } from "../../utils/global_constant.js";
import {
	RequirementFormItemNames,
	RequirementFormItemLabels,
	RequirementStatusEnum,
} from "../../service/service_project_manager.js";

import styles from "./project_manager.module.scss";

const { TextArea } = Input;
const { Option } = Select;
const labelCol = { flex: "110px" };

/**
 * 需求管理 - 新增/编辑需求表单组件
 * @component
 * @param {Object} props
 * @param {Function} props.onAddOk - 新增成功回调，参数为表单数据
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
	 * 确认按钮回调
	 * @returns {void}
	 */
	const handleOnOk = useCallback(() => {
		form.validateFields().then((values) => {
			// 日期格式转换
			const formData = { ...values };
			if (formData.devTime) formData.devTime = formData.devTime.format("YYYY-MM-DD");
			if (formData.testTime) formData.testTime = formData.testTime.format("YYYY-MM-DD");
			if (formData.onlineTime) formData.onlineTime = formData.onlineTime.format("YYYY-MM-DD");

			if (isAdd) {
				onAddOk(formData);
			} else if (isEdit) {
				onEditOk(record.id, formData);
			}
			setVisible(false);
			form.resetFields();
		});
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
			 * 打开新增需求对话框
			 */
			startAddRequirement() {
				setStatus(ModalStatusTypeEnum.Add);
				setVisible(true);
				form.resetFields();
				form.setFieldsValue({
					[RequirementFormItemNames.status]: RequirementStatusEnum.pending,
				});
			},
			/**
			 * 打开编辑需求对话框
			 * @param {Object} record - 要编辑的需求数据
			 */
			startEditRequirement(record) {
				setStatus(ModalStatusTypeEnum.Edit);
				setRecord(record);
				form.setFieldsValue({
					[RequirementFormItemNames.name]: record.name,
					[RequirementFormItemNames.projectIds]: record.projectIds,
					[RequirementFormItemNames.aoneUrl]: record.aoneUrl,
					[RequirementFormItemNames.prdUrl]: record.prdUrl,
					[RequirementFormItemNames.designUrl]: record.designUrl,
					[RequirementFormItemNames.testUrl]: record.testUrl,
					[RequirementFormItemNames.crUrl]: record.crUrl,
					[RequirementFormItemNames.iterationUrl]: record.iterationUrl,
					[RequirementFormItemNames.devTime]: record.devTime ? dayjs(record.devTime) : null,
					[RequirementFormItemNames.testTime]: record.testTime ? dayjs(record.testTime) : null,
					[RequirementFormItemNames.onlineTime]: record.onlineTime ? dayjs(record.onlineTime) : null,
					[RequirementFormItemNames.comment]: record.comment,
					[RequirementFormItemNames.status]: record.status,
				});
				setVisible(true);
			},
		}),
		[form],
	);

	return (
		<Modal
			className={styles.requirementFormWrapper}
			title={`${isAdd ? "新增" : "编辑"}需求`}
			open={visible}
			onOk={handleOnOk}
			onCancel={handleOnCancel}
			width={700}
			centered
		>
			<Form className={styles.requirementForm} form={form} labelCol={labelCol}>
				<Form.Item
					name={RequirementFormItemNames.name}
					label={RequirementFormItemLabels.name}
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.projectIds} label={RequirementFormItemLabels.projectIds}>
					<Select mode="multiple" placeholder="请选择关联项目" options={projectOptions} />
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.aoneUrl} label={RequirementFormItemLabels.aoneUrl}>
					<Input />
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.prdUrl} label={RequirementFormItemLabels.prdUrl}>
					<Input />
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.designUrl} label={RequirementFormItemLabels.designUrl}>
					<Input />
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.testUrl} label={RequirementFormItemLabels.testUrl}>
					<Input />
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.crUrl} label={RequirementFormItemLabels.crUrl}>
					<Input />
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.iterationUrl} label={RequirementFormItemLabels.iterationUrl}>
					<Input />
				</Form.Item>
				<Form.Item
					name={RequirementFormItemNames.devTime}
					label={RequirementFormItemLabels.devTime}
					rules={[{ required: true }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name={RequirementFormItemNames.testTime}
					label={RequirementFormItemLabels.testTime}
					rules={[{ required: true }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name={RequirementFormItemNames.onlineTime}
					label={RequirementFormItemLabels.onlineTime}
					rules={[{ required: true }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name={RequirementFormItemNames.status}
					label={RequirementFormItemLabels.status}
					rules={[{ required: true }]}
				>
					<Select>
						<Option value={RequirementStatusEnum.pending}>{RequirementStatusEnum.pending}</Option>
						<Option value={RequirementStatusEnum.developing}>{RequirementStatusEnum.developing}</Option>
						<Option value={RequirementStatusEnum.debugging}>{RequirementStatusEnum.debugging}</Option>
						<Option value={RequirementStatusEnum.testing}>{RequirementStatusEnum.testing}</Option>
						<Option value={RequirementStatusEnum.online}>{RequirementStatusEnum.online}</Option>
					</Select>
				</Form.Item>
				<Form.Item name={RequirementFormItemNames.comment} label={RequirementFormItemLabels.comment}>
					<TextArea rows={3} />
				</Form.Item>
			</Form>
		</Modal>
	);
});
