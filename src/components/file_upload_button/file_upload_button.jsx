import "./file_upload_button.scss";

export default function CFileUpload(props = {}) {
	const { onInput, webkitdirectory = "false" } = props;

	return (
		<input
			type="file"
			name="files"
			className="c_hidden_input_button"
			webkitdirectory={webkitdirectory}
			onInput={onInput}
		/>
	);
}
