import { forwardRef, useState, useCallback, useImperativeHandle } from "react";
import { Modal, Button, Select, message, Tree } from "antd";
import { CFileUpload } from "../file_upload_button/file_upload_button.jsx";
import { createCodeFilesTreeByFileList } from "../../utils/input_files/code_files/create_code_files_tree_by_file_list.js";

import styles from "./upload_code_files.module.scss";

const UploadCodeFilesOKMessageKey = "UploadCodeFilesOKMessageKey";

export const UploadCodeFiles = forwardRef((props, ref) => {
	const { onOk, autoCloseOnOk = true } = props;

	const [visible, setVisible] = useState(false);
	const [allFiles, setAllFiles] = useState([]);
	const [allFilesSuffixOptions, setAllFilesSuffixOptions] = useState([]);
	const [needFiles, setNeedFiles] = useState([]);
	const [selectedSuffixes, setSelectedSuffixes] = useState([]);

	// 文件树相关状态
	const [rootCodeFolder, setRootCodeFolder] = useState(null);
	const [treeData, setTreeData] = useState([]);
	const [checkedKeys, setCheckedKeys] = useState([]);
	const [expandedKeys, setExpandedKeys] = useState([]);

	/** 点击确定 */
	const handleOnModalOK = useCallback(async () => {
		if (needFiles.length === 0) {
			message.warning({
				key: UploadCodeFilesOKMessageKey,
				content: "请选择需要解析的文件",
			});
			return;
		}
		// 同时返回选中文件和完整代码树对象（外部可直接使用 codeFilesMap）
		onOk({
			files: needFiles,
			rootCodeFolder: rootCodeFolder,
		});
		if (autoCloseOnOk) {
			setVisible(false);
		}
	}, [autoCloseOnOk, needFiles, onOk, rootCodeFolder]);

	/** 点击取消 */
	const handleOnModalCancel = useCallback(() => {
		setVisible(false);
	}, []);

	/** 处理上传文件，生成代码树并读取文件内容 */
	const onAddFiles = useCallback(async (files) => {
		// 生成带 codeFilesMap 的代码树结构
		const rootFolder = createCodeFilesTreeByFileList(files);
		// 异步读取所有文件内容，自动填充 codeFilesMap
		await rootFolder.readFilesAsText();

		setRootCodeFolder(rootFolder);
		setTreeData(rootFolder.children);

		// 提取所有文件后缀
		const filesSuffixes = [];
		for (let i = 0, len = files.length; i < len; i++) {
			const name = files[i].name;
			const suffix = name.substring(name.lastIndexOf("."));
			if (!filesSuffixes.includes(suffix)) {
				filesSuffixes.push(suffix);
			}
		}

		setAllFilesSuffixOptions(
			filesSuffixes.map((suffix) => ({
				value: suffix,
				label: suffix,
			})),
		);

		// 重置所有选中状态
		setCheckedKeys([]);
		setExpandedKeys([]);
		setNeedFiles([]);
		setSelectedSuffixes([]);
		setAllFiles([...files]);
	}, []);

	/** input 上传文件回调 */
	const handleOnInput = useCallback(
		(e) => {
			onAddFiles(e.target.files);
		},
		[onAddFiles],
	);

	/** 按后缀批量选择文件（同步更新树勾选） */
	const onSetNeedFilesSuffixes = useCallback(
		(needFilesSuffixes) => {
			setSelectedSuffixes(needFilesSuffixes);

			if (needFilesSuffixes.length === 0) {
				setCheckedKeys([]);
				setNeedFiles([]);
				return;
			}

			// 筛选符合后缀的文件并同步勾选状态
			const newNeedFiles = [];
			const newCheckedKeys = [];
			for (let i = 0, len = allFiles.length; i < len; i++) {
				const file = allFiles[i];
				const suffix = file.name.substring(file.name.lastIndexOf("."));
				if (needFilesSuffixes.includes(suffix)) {
					newNeedFiles.push(file);
					newCheckedKeys.push(file.webkitRelativePath);
				}
			}

			setNeedFiles(newNeedFiles);
			setCheckedKeys(newCheckedKeys);
		},
		[allFiles],
	);

	/** 处理树节点展开/折叠 */
	const handleOnTreeExpand = useCallback((expandedKeys) => {
		setExpandedKeys(expandedKeys);
	}, []);

	/** 处理树节点勾选/取消（同步更新后缀选择器） */
	const handleOnTreeCheck = useCallback(
		(checkedKeys) => {
			setCheckedKeys(checkedKeys);

			// 根据勾选的key同步更新选中的文件数组
			const newNeedFiles = allFiles.filter((file) => checkedKeys.includes(file.webkitRelativePath));
			setNeedFiles(newNeedFiles);

			// 利用 codeFilesMap 计算当前选中文件的所有后缀
			const currentSuffixes = new Set();
			checkedKeys.forEach((key) => {
				// 只有文件节点会存在于 codeFilesMap 中
				if (rootCodeFolder?.codeFilesMap?.[key]) {
					const suffix = rootCodeFolder.codeFilesMap[key].suffix;
					currentSuffixes.add(suffix);
				}
			});
			setSelectedSuffixes(Array.from(currentSuffixes));
		},
		[allFiles, rootCodeFolder],
	);

	useImperativeHandle(ref, () => ({
		startUpload() {
			setVisible(true);
		},
		endUpload() {
			setVisible(false);
		},
	}));

	return (
		<Modal
			title="代码文件上传"
			centered
			open={visible}
			onOk={handleOnModalOK}
			onCancel={handleOnModalCancel}
			width={600}
		>
			<div className={styles.upload_code_files}>
				<div className={styles.upload_code_files_header}>
					<Button>
						上传文件/文件夹
						<CFileUpload onInput={handleOnInput} webkitdirectory="" multiple />
					</Button>
					{allFilesSuffixOptions.length > 0 && (
						<Select
							style={{ flex: 1 }}
							mode="multiple"
							allowClear
							placeholder="按后缀批量选择"
							value={selectedSuffixes}
							onChange={onSetNeedFilesSuffixes}
							options={allFilesSuffixOptions}
						/>
					)}
				</div>

				{/* 文件树展示区域 */}
				<div className={styles.upload_code_files_tree}>
					<Tree
						checkable
						showLine
						blockNode
						expandedKeys={expandedKeys}
						checkedKeys={checkedKeys}
						onExpand={handleOnTreeExpand}
						onCheck={handleOnTreeCheck}
						treeData={treeData}
					/>
				</div>

				{/* 已选中文件数量统计 */}
				<div className={styles.upload_code_files_footer}>
					已选择 <span className={styles.selected_count}>{needFiles.length}</span> 个文件
				</div>
			</div>
		</Modal>
	);
});
