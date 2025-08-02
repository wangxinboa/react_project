import { Form, Button, Input, Switch, Select } from "antd";

export default function AntdQuickForm(props) {
	const { onFinish, submitTitle, options = [], formProps = {} } = props;

	const [form] = Form.useForm();

	return (
		<Form form={form} onFinish={onFinish} {...formProps}>
			{options.map((antdQuickFormOption, index) => {
				return (
					<Form.Item key={antdQuickFormOption.itemPtops.name ?? index} {...(antdQuickFormOption.itemPtops ?? {})}>
						{antdQuickFormOption.type === "Input" ? (
							<Input {...antdQuickFormOption.controlProps} />
						) : antdQuickFormOption.type === "Switch" ? (
							<Switch {...antdQuickFormOption.controlProps} />
						) : antdQuickFormOption.type === "Select" ? (
							<Select {...antdQuickFormOption.controlProps} />
						) : null}
					</Form.Item>
				);
			})}
			<div style={{ textAlign: "right" }}>
				<Button type="primary" htmlType="submit">
					{submitTitle}
				</Button>
			</div>
		</Form>
	);
}
