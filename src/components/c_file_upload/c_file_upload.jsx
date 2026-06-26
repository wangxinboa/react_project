import styles from "./c_file_upload.module.scss";

/**
 * 文件上传按钮（隐藏的原生 input 包裹）
 * @param {Object} props
 * @param {Function} props.onInput - 文件选择回调
 * @param {string|null} [props.webkitdirectory=null] - 支持目录选择
 * @param {boolean|null} [props.multiple=null] - 支持多选
 * @param {string|null} [props.accept=null] - 限制文件类型，如 ".json"
 * @returns {JSX.Element}
 */
export function CFileUpload(props = {}) {
	const { onInput, webkitdirectory = null, multiple = null, accept = null } = props;

	return (
		<input
			type="file"
			name="files"
			className={styles.c_hidden_input_button}
			webkitdirectory={webkitdirectory}
			multiple={multiple}
			accept={accept}
			onInput={onInput}
		/>
	);
}
