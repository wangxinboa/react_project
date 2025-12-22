import ConsoleMessageButton from "../../../../node_operations/console_message.jsx";
import styles from "../operation_record.module.scss";

const ImportVariablePopoverContent = (props) => {
	const { importVariableStruct } = props;

	return (
		<div className={styles.key_point_text_popover_content}>
			<ConsoleMessageButton
				title={`打印 ${importVariableStruct.type} importVariable 信息`}
				message={importVariableStruct}
			/>
		</div>
	);
};
export default ImportVariablePopoverContent;
