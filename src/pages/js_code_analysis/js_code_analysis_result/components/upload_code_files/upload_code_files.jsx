import { forwardRef, useState, useCallback, useImperativeHandle } from "react";
import { Modal, Button, Select, message } from "antd";
import CFileUpload from "../../../../../components/file_upload_button/file_upload_button.jsx";

import styles from "./upload_code_files.module.scss";

const AnalysisResultSettingHandleOnOKMessageKey = "AnalysisResultSettingHandleOnOKMessageKey";

const UploadCodeFiles = forwardRef((props, ref) => {
	const { onOk, autoCloseOnOk = true } = props;

	const [visible, setVisible] = useState(false);

	const [allFiles, setAllFiles] = useState([]);
	const [allFilesSuffixOptions, setAllFilesSuffixOptions] = useState([]);

	const [needFiles, setNeedFiles] = useState([]);

	/** 点击确定 */
	const handleOnModalOK = useCallback(async () => {
		if (needFiles.length === 0) {
			message.warning({
				key: AnalysisResultSettingHandleOnOKMessageKey,
				content: "请选择需要解析的文件",
			});
		} else {
			onOk(needFiles);
		}
		if (autoCloseOnOk) {
			setVisible(false);
		}
	}, [autoCloseOnOk, needFiles, onOk]);

	/** 点击取消 */
	const handleOnModalCancel = useCallback(() => {
		setVisible(false);
	}, []);

	/** 上传文件 */
	const handleOnInput = useCallback((e) => {
		const files = e.target.files;
		const filesSuffixes = [];
		for (let i = 0, len = files.length; i < len; i++) {
			const name = files[i].name;
			const suffix = name.substring(name.lastIndexOf("."));
			if (!filesSuffixes.includes(suffix)) {
				filesSuffixes.push(suffix);
			}
		}
		setAllFilesSuffixOptions(
			filesSuffixes.map((suffix) => {
				return {
					value: suffix,
					label: suffix,
				};
			})
		);
		setNeedFiles([]);
		setAllFiles([...e.target.files]);
	}, []);
	/** 选择指定后缀的文件数组 */
	const onSetNeedFilesSuffixes = useCallback(
		(needFilesSuffixes) => {
			const newNeedFiles = [];
			for (let i = 0, len = allFiles.length; i < len; i++) {
				const file = allFiles[i];
				const name = file.name;
				const suffix = name.substring(name.lastIndexOf("."));
				if (needFilesSuffixes.includes(suffix)) {
					newNeedFiles.push(file);
				}
			}
			setNeedFiles(newNeedFiles);
		},
		[allFiles]
	);

	useImperativeHandle(
		ref,
		() => {
			return {
				startUpload() {
					setVisible(true);
				},
				endUpload() {
					setVisible(false);
				},
			};
		},
		[]
	);

	return (
		<Modal title={"代码文件上传"} centered={true} open={visible} onOk={handleOnModalOK} onCancel={handleOnModalCancel}>
			<div className={styles.upload_code_files}>
				<div className={styles.upload_code_files_header}>
					<Button>
						上传文件
						<CFileUpload onInput={handleOnInput} webkitdirectory="" />
					</Button>
					{allFilesSuffixOptions.length > 0 ? (
						<Select
							style={{ flex: "1" }}
							mode="multiple"
							allowClear
							placeholder="选择需要的后缀"
							onChange={onSetNeedFilesSuffixes}
							options={allFilesSuffixOptions}
						/>
					) : null}
				</div>
				<div className={styles.upload_code_files_list}>
					{needFiles.map((file) => {
						return (
							<div key={file.webkitRelativePath} className={styles.analysis_form_file}>
								{file.name}
							</div>
						);
					})}
				</div>
			</div>
		</Modal>
	);
});

export default UploadCodeFiles;
