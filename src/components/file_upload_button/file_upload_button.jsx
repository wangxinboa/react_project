import styles from "./file_upload_button.module.scss";

export default function CFileUpload(props = {}) {
	const { onInput, webkitdirectory = null, multiple = null } = props;

	return (
		<input
			type="file"
			name="files"
			className={styles.c_hidden_input_button}
			webkitdirectory={webkitdirectory}
			multiple={multiple}
			onInput={onInput}
		/>
	);
}
