import { Form, Select, Input, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./project_items_form.module.scss";

/**
 * 关联项目表单项（编辑/查看模式）
 * @param {Object} props
 * @param {boolean} props.isView - 是否为查看模式
 * @param {Array} props.projectOptions - 项目下拉选项 [{value, label}]
 * @param {Array} props.value - 查看模式下的 projectItems 数据
 * @param {string} [props.name="projectItems"] - 表单字段名
 * @param {string} props.label - 标签文本
 */
export function ProjectItemsForm({ isView, projectOptions, value, name = "projectItems", label }) {
	if (isView) {
		if (!value || value.length === 0) return null;
		return (
			<Form.Item label={label}>
				<div className={styles.viewList}>
					{value.map((item, idx) => {
						const proj = projectOptions.find((opt) => opt.value === item.projectId);
						const projectName = proj ? proj.label : "未知项目";
						const crUrl = item.crUrl || "";
						return (
							<div key={idx} className={styles.viewItem}>
								<span>{projectName}</span>
								{crUrl && (
									<a href={crUrl} target="_blank" rel="noopener noreferrer" className={styles.crLink}>
										CR 地址
									</a>
								)}
							</div>
						);
					})}
				</div>
			</Form.Item>
		);
	}

	return (
		<Form.List name={name}>
			{(fields, { add, remove }) => (
				<>
					{fields.map(({ key, name: fieldName, ...restField }) => (
						<div key={key} className={styles.listItem}>
							<Form.Item
								{...restField}
								name={[fieldName, "projectId"]}
								label={label}
								rules={[{ required: true, message: "请选择项目" }]}
								className={styles.formItemFlex}
							>
								<Select placeholder="选择项目" options={projectOptions} />
							</Form.Item>
							<Form.Item {...restField} name={[fieldName, "crUrl"]} label="CR 地址" className={styles.formItemFlex}>
								<Input placeholder="CR 地址" />
							</Form.Item>
							<Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(fieldName)} />
						</div>
					))}
					<Button
						type="dashed"
						onClick={() => add({ projectId: undefined, crUrl: "" })}
						block
						icon={<PlusOutlined />}
						className={styles.addBtn}
					>
						添加关联项目
					</Button>
				</>
			)}
		</Form.List>
	);
}
