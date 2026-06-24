import { Form, Input } from "antd";

/**
 * URL 表单项组件（支持编辑/查看模式）
 * @param {Object} props
 * @param {boolean} props.isView - 是否为查看模式
 * @param {string} [props.url] - 查看模式下的链接地址，编辑模式忽略
 * @param {string} props.name - 字段名
 * @param {string} props.label - 字段标签
 * @returns {JSX.Element}
 */
export function UrlFormItem({ isView, url, name, label }) {
	return (
		<Form.Item name={name} label={label}>
			{isView ? (
				url ? (
					<a href={url} target="_blank" rel="noopener noreferrer">
						{label}
					</a>
				) : (
					<span>-</span>
				)
			) : (
				<Input />
			)}
		</Form.Item>
	);
}
