import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Button, Input, Select, Switch, message } from "antd";
import { CFileTree } from "../../../components/c_file_tree/c_file_tree.jsx";
import { serviceFetchFileTree } from "../../../services/service_ai_prompt.js";
import { downloadText } from "../../../utils/download/download.js";
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
 * @param {string} [props.rootPath=''] - 根目录路径
 * @param {string} [props.exclude=''] - 排除的文件夹名，逗号分隔
 * @param {string[]} [props.checkedKeys=[]] - 当前勾选的文件 key 数组
 * @param {Object[]} [props.treeData=[]] - antd Tree 的树数据
 * @param {{value: string, label: string}[]} [props.suffixOptions=[]] - 后缀筛选选项
 * @param {Object<string, AppType.FileInfo>} [props.codeFilesMap={}] - 文件信息映射
 * @param {string[]} [props.allFileKeys=[]] - 所有文件 key 数组
 * @param {boolean} [props.shouldPrint=true] - 是否允许在全局打印时输出该组件
 * @param {(config: Object) => void} props.onChange - 状态变化回调，参数为要合并的配置对象
 * @param {() => void} props.onDelete - 删除当前组件回调
 * @returns {JSX.Element}
 */
export const PromptCodeTree = React.memo(function PromptCodeTree({
	rootPath = "",
	exclude = "",
	checkedKeys = [],
	treeData = [],
	suffixOptions = [],
	codeFilesMap = {},
	allFileKeys = [],
	shouldPrint = true,
	onChange,
	onDelete,
}) {
	const [loading, setLoading] = useState(false);
	const initialLoadDone = useRef(false);

	// 预先构建后缀到文件键的映射，供筛选时直接使用
	const suffixToKeysMap = useMemo(() => {
		const map = {};
		for (let i = 0; i < allFileKeys.length; i++) {
			const key = allFileKeys[i];
			const suffix = codeFilesMap[key]?.suffix;
			if (suffix) {
				if (!map[suffix]) {
					map[suffix] = [];
				}
				map[suffix].push(key);
			}
		}
		return map;
	}, [allFileKeys, codeFilesMap]);

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
				const keys = Object.keys(map);

				const suffixSet = {};
				for (let i = 0; i < keys.length; i++) {
					const s = map[keys[i]].suffix;
					if (s) suffixSet[s] = true;
				}
				const optionsArr = [];
				const suffixKeys = Object.keys(suffixSet);
				for (let i = 0; i < suffixKeys.length; i++) {
					optionsArr.push({ value: suffixKeys[i], label: suffixKeys[i] });
				}

				onChange({
					rootPath: path.trim(),
					exclude: exc || "",
					checkedKeys,
					treeData: [rootTreeNode],
					suffixOptions: optionsArr,
					codeFilesMap: map,
					allFileKeys: keys,
				});
			} catch (err) {
				message.error("加载文件树失败");
			} finally {
				setLoading(false);
			}
		},
		[checkedKeys, onChange],
	);

	const handlePathChange = useCallback(
		(e) => {
			const folderPath = getFolderPath(e.target.value);
			onChange({ rootPath: folderPath, exclude, checkedKeys });
		},
		[exclude, checkedKeys, onChange],
	);

	const handleExcludeChange = useCallback(
		(e) => onChange({ rootPath, exclude: e.target.value, checkedKeys }),
		[rootPath, checkedKeys, onChange],
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
			const prevSuffixSet = {};
			for (let i = 0; i < selectedSuffixes.length; i++) {
				prevSuffixSet[selectedSuffixes[i]] = true;
			}
			const newSuffixSet = {};
			for (let i = 0; i < newSuffixes.length; i++) {
				newSuffixSet[newSuffixes[i]] = true;
			}

			const resultKeysObj = {};

			// 1. 保留原有 checkedKeys 中后缀仍在 newSuffixes 中的文件
			for (let i = 0; i < checkedKeys.length; i++) {
				const key = checkedKeys[i];
				const suffix = codeFilesMap[key]?.suffix;
				if (suffix && newSuffixSet[suffix]) {
					resultKeysObj[key] = true;
				}
			}

			// 2. 对新增后缀，一键勾选该后缀的所有文件
			for (let i = 0; i < newSuffixes.length; i++) {
				const suffix = newSuffixes[i];
				if (!prevSuffixSet[suffix]) {
					const keys = suffixToKeysMap[suffix];
					if (keys) {
						for (let j = 0; j < keys.length; j++) {
							resultKeysObj[keys[j]] = true;
						}
					}
				}
			}

			const newCheckedKeys = Object.keys(resultKeysObj);
			newCheckedKeys.sort();
			onChange({ rootPath, exclude, checkedKeys: newCheckedKeys });
		},
		[selectedSuffixes, checkedKeys, codeFilesMap, suffixToKeysMap, rootPath, exclude, onChange],
	);

	const handleCheck = useCallback(
		(keys) => onChange({ rootPath, exclude, checkedKeys: keys }),
		[rootPath, exclude, onChange],
	);

	const handleShouldPrintChange = useCallback((checked) => onChange({ shouldPrint: checked }), [onChange]);

	const handleExport = useCallback(() => {
		const promptStr = generateCodeTreePromptString(checkedKeys, codeFilesMap);
		downloadText(promptStr, "代码树提示词.txt");
	}, [checkedKeys, codeFilesMap]);

	useEffect(() => {
		if (!initialLoadDone.current) {
			initialLoadDone.current = true;
			if (rootPath) {
				loadFileTree(rootPath, exclude);
			}
		}
	}, [rootPath, exclude, loadFileTree]);

	return (
		<div className={styles.componentItem}>
			<div className={styles.componentHeader}>
				<span>代码树</span>
				<div className={styles.headerActions}>
					<span className={styles.switchLabel}>是否打印</span>
					<Switch size="small" checked={shouldPrint} onChange={handleShouldPrintChange} />
					<Button size="small" onClick={handleExport}>
						导出提示词
					</Button>
					<Button size="small" danger onClick={onDelete}>
						删除
					</Button>
				</div>
			</div>
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
		</div>
	);
});
