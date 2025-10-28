import ConsoleMessageButton from "../../../node_operations/console_message.jsx";
import SelectCodeFileButton from "../../../node_operations/select_code_file.jsx";
import ToFileVsCodeButton from "../../../node_operations/to_file_vs_code.jsx";
import styles from "./operation_record.module.scss";

const FileStructPopoverContent = (props) => {
	const { fileStruct } = props;

	return (
		<div className={styles.key_point_text_popover_content}>
			<ConsoleMessageButton title={`打印 ${fileStruct.getCodeFileName()} fileStruct 信息`} message={fileStruct} />
			<ToFileVsCodeButton title="跳转 vscode" codeFile={fileStruct.codeFile} />
			<SelectCodeFileButton title="选择文件" codeFile={fileStruct.codeFile} />
		</div>
	);
};
export default FileStructPopoverContent;
