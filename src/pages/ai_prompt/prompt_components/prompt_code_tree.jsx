import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Button, Input, Select, message } from "antd";
import { CFileTree } from "../../../components/c_file_tree/c_file_tree.jsx";
import { serviceFetchFileTree } from "../../../service/service_ai_prompt.js";
import styles from "./prompt_components.module.scss";

/**
 * 将服务端返回的节点转换为 antd Tree 所需格式，同时将文件信息存入 codeFilesMap
 * @param {AppType.ServerTreeNode} node - 服务端节点
 * @param {Object<string, AppType.FileInfo>} codeFilesMap - 文件信息映射
 * @returns {Object} antd Tree 节点
 */
function convertNode(node, codeFilesMap) {
	if (node.isFolder) {
		const convertedChildren = [];
		for (let i = 0; i < node.children.length; i++) {
			convertedChildren.push(convertNode(node.children[i], codeFilesMap));
		}
		return { key: node.key, title: node.title, selectable: false, children: convertedChildren };
	}
	const fileSuffix = node.suffix || node.title;
	codeFilesMap[node.key] = { codeString: node.codeString || "", suffix: fileSuffix };
	return { key: node.key, title: node.title, isLeaf: true, selectable: true };
}

/**
 * 判断路径是否看起来像文件，如果是则返回其父目录路径
 * @param {string} inputPath - 输入路径
 * @returns {string} 文件夹路径
 */
function getFolderPath(inputPath) {
	const lastSlash = inputPath.lastIndexOf("/");
	const lastSegment = lastSlash >= 0 ? inputPath.substring(lastSlash + 1) : inputPath;
	const dotIndex = lastSegment.lastIndexOf(".");
	if (dotIndex > 0 && dotIndex < lastSegment.length - 1) {
		return lastSlash >= 0 ? inputPath.substring(0, lastSlash) : "";
	}
	return inputPath;
}

/**
 * 根据勾选的文件路径和文件信息映射，生成代码树提示字符串
 * @param {string[]} checkedKeys - 勾选的文件路径数组
 * @param {Object<string, AppType.FileInfo>} codeFilesMap - 文件信息映射
 * @returns {string} 拼接的提示字符串
 */
export function generateCodeTreePromptString(checkedKeys, codeFilesMap) {
	let str = "";
	for (let i = 0; i < checkedKeys.length; i++) {
		const fi = codeFilesMap[checkedKeys[i]];
		if (fi) {
			str += `文件目录:\n${checkedKeys[i]}\n文件代码:\n${fi.codeString}\n\n`;
		}
	}
	return str;
}

/**
 * AI 提示词代码树组件（受控）
 * @param {Object} props
 * @param {string} props.rootPath - 根目录路径
 * @param {string} props.exclude - 排除的文件夹名，逗号分隔
 * @param {string[]} props.checkedKeys - 当前勾选的文件 key 数组
 * @param {(config: {rootPath?: string, exclude?: string, checkedKeys?: string[]}) => void} props.onConfigChange
 * @param {(map: Object<string, AppType.FileInfo>) => void} props.onCodeFilesMapChange
 * @returns {JSX.Element}
 */
export const PromptCodeTree = React.memo(function PromptCodeTree({
	rootPath,
	exclude,
	checkedKeys,
	onConfigChange,
	onCodeFilesMapChange,
}) {
	const [treeData, setTreeData] = useState([]);
	const [suffixOptions, setSuffixOptions] = useState([]);
	const [codeFilesMap, setCodeFilesMap] = useState({});
	const [allFileKeys, setAllFileKeys] = useState([]);
	const [loading, setLoading] = useState(false);
	const initialLoadDone = useRef(false);

	const selectedSuffixes = useMemo(() => {
		const suffixSet = {};
		for (let i = 0; i < checkedKeys.length; i++) {
			const fi = codeFilesMap[checkedKeys[i]];
			if (fi) suffixSet[fi.suffix] = true;
		}
		return Object.keys(suffixSet);
	}, [checkedKeys, codeFilesMap]);

	const loadFileTree = useCallback(
		async (path, exc) => {
			if (!path.trim()) return;
			setLoading(true);
			try {
				const node = await serviceFetchFileTree(path.trim(), exc || "");
				const map = {};
				const rootTreeNode = convertNode(node, map);
				setTreeData([rootTreeNode]);
				setCodeFilesMap(map);
				onCodeFilesMapChange(map);

				const keys = Object.keys(map);
				setAllFileKeys(keys);

				const suffixSet = {};
				for (let i = 0; i < keys.length; i++) {
					const s = map[keys[i]].suffix;
					if (s) suffixSet[s] = true;
				}
				const options = Object.keys(suffixSet).map((suffix) => ({ value: suffix, label: suffix }));
				setSuffixOptions(options);
			} catch (err) {
				message.error("加载文件树失败");
			} finally {
				setLoading(false);
			}
		},
		[onCodeFilesMapChange],
	);

	const handlePathChange = useCallback(
		(e) => {
			const folderPath = getFolderPath(e.target.value);
			onConfigChange({ rootPath: folderPath, exclude, checkedKeys });
		},
		[exclude, checkedKeys, onConfigChange],
	);

	const handleExcludeChange = useCallback(
		(e) => onConfigChange({ rootPath, exclude: e.target.value, checkedKeys }),
		[rootPath, checkedKeys, onConfigChange],
	);

	const handleLoadClick = useCallback(() => {
		if (!rootPath.trim()) {
			message.warning("请输入根文件目录");
			return;
		}
		loadFileTree(rootPath, exclude);
	}, [rootPath, exclude, loadFileTree]);

	const handleSuffixChange = useCallback(
		(newSuffixes) => {
			const prevSuffixesObj = {};
			for (let i = 0; i < selectedSuffixes.length; i++) {
				prevSuffixesObj[selectedSuffixes[i]] = true;
			}
			const newSuffixesObj = {};
			for (let i = 0; i < newSuffixes.length; i++) {
				newSuffixesObj[newSuffixes[i]] = true;
			}

			// 构建新的选中 key 集合
			const resultKeysObj = {};
			for (let i = 0; i < checkedKeys.length; i++) {
				const key = checkedKeys[i];
				const info = codeFilesMap[key];
				if (info && newSuffixesObj[info.suffix]) {
					resultKeysObj[key] = true;
				}
			}
			// 添加新增后缀对应的所有文件
			for (let i = 0; i < newSuffixes.length; i++) {
				const suffix = newSuffixes[i];
				if (!prevSuffixesObj[suffix]) {
					for (let j = 0; j < allFileKeys.length; j++) {
						const key = allFileKeys[j];
						if (codeFilesMap[key].suffix === suffix) {
							resultKeysObj[key] = true;
						}
					}
				}
			}
			const newCheckedKeys = Object.keys(resultKeysObj);
			onConfigChange({ rootPath, exclude, checkedKeys: newCheckedKeys });
		},
		[selectedSuffixes, checkedKeys, codeFilesMap, allFileKeys, rootPath, exclude, onConfigChange],
	);

	const handleCheck = useCallback(
		(keys) => onConfigChange({ rootPath, exclude, checkedKeys: keys }),
		[rootPath, exclude, onConfigChange],
	);

	useEffect(() => {
		if (!initialLoadDone.current) {
			initialLoadDone.current = true;
			if (rootPath) {
				loadFileTree(rootPath, exclude);
			}
		}
	}, [rootPath, exclude, loadFileTree]);

	return (
		<div className={styles.promptCodeTree}>
			<div className={styles.promptCodeTreeForm}>
				<div className={styles.promptCodeTreeFormRow}>
					<Input
						className={styles.flexInput}
						placeholder="根文件目录，如 /Users/me/project/src"
						value={rootPath}
						onChange={handlePathChange}
					/>
				</div>
				<div className={styles.promptCodeTreeFormRow}>
					<Input
						className={styles.flexInput}
						placeholder="排除文件夹，逗号分割，如 node_modules,dist"
						value={exclude}
						onChange={handleExcludeChange}
					/>
					<Button type="primary" loading={loading} onClick={handleLoadClick}>
						加载
					</Button>
				</div>
			</div>
			{suffixOptions.length > 0 && (
				<Select
					className={styles.suffixSelect}
					mode="multiple"
					allowClear
					placeholder="按后缀/文件名筛选"
					value={selectedSuffixes}
					onChange={handleSuffixChange}
					options={suffixOptions}
				/>
			)}
			{treeData.length > 0 ? (
				<CFileTree treeData={treeData} checkedKeys={checkedKeys} onCheck={handleCheck} />
			) : (
				<div className={styles.promptCodeTreeEmpty}>请加载文件目录</div>
			)}
		</div>
	);
});
