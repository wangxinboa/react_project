import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Button, Input, Select, Switch, message } from "antd";
import { CFileTree } from "../../../components/c_file_tree/c_file_tree.jsx";
import { serviceFetchFileTree } from "../../../services/service_ai_prompt.js";
import { downloadText } from "../../../utils/download/download.js";
import styles from "./prompt_components.module.scss";

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

function getFolderPath(inputPath) {
	const lastSlash = inputPath.lastIndexOf("/");
	const lastSegment = lastSlash >= 0 ? inputPath.substring(lastSlash + 1) : inputPath;
	const dotIndex = lastSegment.lastIndexOf(".");
	if (dotIndex > 0 && dotIndex < lastSegment.length - 1) {
		return lastSlash >= 0 ? inputPath.substring(0, lastSlash) : "";
	}
	return inputPath;
}

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
	const [selectedSuffixes, setSelectedSuffixes] = useState([]);
	const initialLoadDone = useRef(false);
	const prevSelectedSuffixesRef = useRef([]);

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

	const syncSelectedSuffixes = useCallback((keys, map) => {
		const suffixSet = {};
		for (let i = 0; i < keys.length; i++) {
			const fi = map[keys[i]];
			if (fi) suffixSet[fi.suffix] = true;
		}
		const currentSuffixes = Object.keys(suffixSet);
		const prevSuffixes = prevSelectedSuffixesRef.current;
		const newOrder = [];
		for (let i = 0; i < prevSuffixes.length; i++) {
			if (suffixSet[prevSuffixes[i]]) {
				newOrder.push(prevSuffixes[i]);
			}
		}
		for (let i = 0; i < currentSuffixes.length; i++) {
			const s = currentSuffixes[i];
			let exists = false;
			for (let j = 0; j < newOrder.length; j++) {
				if (newOrder[j] === s) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				newOrder.push(s);
			}
		}
		prevSelectedSuffixesRef.current = newOrder;
		setSelectedSuffixes(newOrder);
	}, []);

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
				syncSelectedSuffixes(checkedKeys, map);
			} catch (err) {
				message.error("加载文件树失败");
			} finally {
				setLoading(false);
			}
		},
		[checkedKeys, onChange, syncSelectedSuffixes],
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
			setSelectedSuffixes(newSuffixes);
			prevSelectedSuffixesRef.current = newSuffixes;

			const prevSuffixSet = {};
			const oldSuffixes = prevSelectedSuffixesRef.current;
			for (let i = 0; i < oldSuffixes.length; i++) {
				prevSuffixSet[oldSuffixes[i]] = true;
			}
			const newSuffixSet = {};
			for (let i = 0; i < newSuffixes.length; i++) {
				newSuffixSet[newSuffixes[i]] = true;
			}

			const resultKeysObj = {};

			for (let i = 0; i < checkedKeys.length; i++) {
				const key = checkedKeys[i];
				const fi = codeFilesMap[key];
				if (!fi) continue;
				const suffix = fi.suffix;
				// 没有后缀的文件直接保留，有后缀的文件仅当后缀在选中集合中才保留
				if (!suffix || newSuffixSet[suffix]) {
					resultKeysObj[key] = true;
				}
			}

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
		[checkedKeys, codeFilesMap, suffixToKeysMap, rootPath, exclude, onChange],
	);

	const handleCheck = useCallback(
		(keys) => {
			syncSelectedSuffixes(keys, codeFilesMap);
			onChange({ rootPath, exclude, checkedKeys: keys });
		},
		[rootPath, exclude, onChange, syncSelectedSuffixes, codeFilesMap],
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
