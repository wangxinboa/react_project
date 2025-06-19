import { useCallback, useEffect } from "react";
import { Modal, Form, Input } from "antd";

// import CFileUpload from "../../../components/file_upload_button/file_upload_button.jsx";
// import getCodeFiles from "./input_files/get_files.js";
// import { downloadJSON } from "../../../utils/utils.js";

import "./analysis_form.scss";

export default function AnalysisForm(props) {
	const { data, visible, setVisible, onOk } = props;

	const [form] = Form.useForm();

	// const [files, setFiles] = useState([]);
	// const [needFiles, setNeedFiles] = useState([]);
	// const [filesSuffixOptions, setFilesSuffixOptions] = useState([]);
	// const [needFilesSuffixes, setNeedFilesSuffixes] = useState([]);

	// const handleOnUploadFiles = useCallback((e) => {
	// 	const files = e.target.files;
	// 	const filesSuffixes = [];
	// 	for (let i = 0, len = files.length; i < len; i++) {
	// 		const name = files[i].name;
	// 		const suffix = name.substring(name.lastIndexOf("."));
	// 		if (!filesSuffixes.includes(suffix)) {
	// 			filesSuffixes.push(suffix);
	// 		}
	// 	}
	// 	setFilesSuffixOptions(
	// 		filesSuffixes.map((suffix) => {
	// 			return {
	// 				value: suffix,
	// 				label: suffix,
	// 			};
	// 		})
	// 	);
	// 	setNeedFiles([...e.target.files]);
	// 	setFiles([...e.target.files]);
	// }, []);

	// const handleDownLoadCodeMessage = useCallback(() => {
	// 	const filesTree = getCodeFiles(needFiles);
	// 	filesTree.readFilesAsText();

	// 	filesTree.onReadFiles = () => {
	// 		downloadJSON(JSON.stringify(filesTree), `${form.getFieldValue("name")}.json`);
	// 	};
	// }, [form, needFiles]);

	// useEffect(() => {
	// 	const newNeedFiles = [];
	// 	for (let i = 0, len = files.length; i < len; i++) {
	// 		const file = files[i];
	// 		const name = file.name;
	// 		const suffix = name.substring(name.lastIndexOf("."));
	// 		if (needFilesSuffixes.includes(suffix)) {
	// 			newNeedFiles.push(file);
	// 		}
	// 	}
	// 	setNeedFiles(newNeedFiles);
	// }, [files, needFilesSuffixes]);

	const handleOnOk = useCallback(() => {
		onOk(form.getFieldsValue());
		setVisible(false);
	}, [form, onOk, setVisible]);
	const handleonCancel = useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	useEffect(() => {
		if (data) {
			form.setFieldsValue(data);
		}
	}, [data, form]);

	return (
		<Modal
			style={{ display: "flex", flexDirection: "column" }}
			title={`${data ? "编辑" : "新增"} 分析代码`}
			open={visible}
			onOk={handleOnOk}
			onCancel={handleonCancel}
		>
			<div id="analysisForm">
				<Form form={form}>
					<Form.Item name="name" label="项目名称" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="url" label="项目地址" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Form>
				{/* <div className="analysis_form_files">
					<div className="analysis_form_files_header">
						<Button>
							上传文件
							<CFileUpload onInput={handleOnUploadFiles} />
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
						<Button onClick={handleDownLoadCodeMessage}>下载代码信息</Button>
					</div>
					<div className="analysis_form_files_list">
						{needFiles.map((file) => {
							return (
								<div key={file.webkitRelativePath} className="analysis_form_file">
									{file.name}
								</div>
							);
						})}
					</div>
				</div> */}
			</div>
		</Modal>
	);
}
