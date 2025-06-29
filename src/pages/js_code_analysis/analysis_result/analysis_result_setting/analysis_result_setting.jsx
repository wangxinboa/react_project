import React, { useState, useEffect, useCallback, useImperativeHandle } from "react";
import { Modal, Button, Select, message } from "antd";
import CFileUpload from "../../../../components/file_upload_button/file_upload_button.jsx";
import getCodeFiles from "./input_files/get_files.js";

import styles from "../analysis_result.module.scss";

const AnalysisResultSettingHandleOnOKMessageKey = "AnalysisResultSettingHandleOnOKMessageKey";

export default React.forwardRef(function AnalysisResultSetting(props, ref) {
	const { afterOK } = props;

	const [visible, setVisible] = useState(false);

	const [allFiles, setAllFiles] = useState([]);
	const [needFiles, setNeedFiles] = useState([]);
	const [filesSuffixOptions, setFilesSuffixOptions] = useState([]);
	const [needFilesSuffixes, setNeedFilesSuffixes] = useState([]);

	/** 确定 */
	const handleOnOK = useCallback(async () => {
		if (needFiles.length === 0) {
			message.warning({
				key: AnalysisResultSettingHandleOnOKMessageKey,
				content: "请选择需要解析的文件",
			});
		} else {
			getCodeFiles(needFiles)
				.readFilesAsText()
				.then((rootFolder) => {
					afterOK(rootFolder);
					setVisible(false);
				});
		}
	}, [afterOK, needFiles]);

	/** 取消 */
	const handleOnCancel = useCallback(() => {
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
		setFilesSuffixOptions(
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

	useEffect(() => {
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
	}, [allFiles, needFilesSuffixes]);

	useImperativeHandle(
		ref,
		() => {
			return {
				setModalVisible(_visible) {
					setVisible(_visible);
				},
			};
		},
		[]
	);

	return (
		<Modal title={"编辑分析代码设置"} centered={true} open={visible} onOk={handleOnOK} onCancel={handleOnCancel}>
			<div className={styles.analysis_result_setting}>
				<div className={styles.analysis_form_files_header}>
					<Button>
						上传文件
						<CFileUpload onInput={handleOnInput} webkitdirectory="" />
					</Button>
					{filesSuffixOptions.length > 0 ? (
						<Select
							style={{ flex: "1" }}
							mode="multiple"
							allowClear
							placeholder="选择需要的后缀"
							onChange={setNeedFilesSuffixes}
							options={filesSuffixOptions}
						/>
					) : null}
				</div>
				<div className={styles.analysis_form_files_list}>
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
