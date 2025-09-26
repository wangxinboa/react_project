import styles from "./analysis_message.module.scss";

const CodeStructPath = (props) => {
	const { codeStruct } = props;
	if (codeStruct === null) {
		return null;
	}

	return (
		<div className={styles.analysis_message_code_struct_path_container}>
			{codeStruct.structPath.map((struct, index) => {
				return (
					<div className={styles.analysis_message_code_struct_path} key={struct.baseKey}>
						<div className={styles.analysis_message_code_struct_path_key}>{struct.baseKey}</div>
						{index < codeStruct.structPath.length - 1 ? (
							<div className={styles.analysis_message_code_struct_path_separator}>/</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
};

export default CodeStructPath;
