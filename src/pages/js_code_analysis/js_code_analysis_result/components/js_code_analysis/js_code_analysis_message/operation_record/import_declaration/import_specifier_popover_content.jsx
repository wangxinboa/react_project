import ConsoleMessageButton from "../../../../node_operations/console_message.jsx";
import styles from "../operation_record.module.scss";

const ImportSpecifierPopoverContent = (props) => {
	const { importSpecifier } = props;

	return (
		<div className={styles.key_point_text_popover_content}>
			<ConsoleMessageButton title={`打印 ${importSpecifier.constructor.name} 信息`} message={importSpecifier} />
		</div>
	);
};
export default ImportSpecifierPopoverContent;
