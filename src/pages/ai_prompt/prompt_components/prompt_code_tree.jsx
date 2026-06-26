import { useState, useCallback, useEffect, useRef } from "react";
import { Button, Input, Select, message } from "antd";
import { CFileTree } from "../../../components/c_file_tree/c_file_tree.jsx";
import { fetchFileTree } from "../../../service/service_ai_prompt.js";
import styles from "./prompt_components.module.scss";

function convertNode(node, codeFilesMap) {
	if (node.isFolder) {
		const convertedChildren = [];
		for (let i = 0; i < node.children.length; i++) {
			convertedChildren.push(convertNode(node.children[i], codeFilesMap));
		}
		return { key: node.key, title: node.title, selectable: false, children: convertedChildren };
	} else {
		codeFilesMap[node.key] = { codeString: node.codeString || "", suffix: node.suffix };
		return { key: node.key, title: node.title, isLeaf: true, selectable: true };
	}
}

/**
 * 提示词代码树组件（受控）
 * @param {Object} props
 * @param {string} props.rootPath
 * @param {string} props.exclude
 * @param {string[]} props.checkedKeys
 * @param {(config: {rootPath: string, exclude: string, checkedKeys: string[]}) => void} props.onConfigChange
 * @param {(promptString: string) => void} props.onPromptChange
 */
export function PromptCodeTree({ rootPath, exclude, checkedKeys, onConfigChange, onPromptChange }) {
	const [treeData, setTreeData] = useState([]);
	const [suffixOptions, setSuffixOptions] = useState([]);
	const [selectedSuffixes, setSelectedSuffixes] = useState([]);
	const [codeFilesMap, setCodeFilesMap] = useState({});
	const [loading, setLoading] = useState(false);
	const loadedPathRef = useRef("");

	const buildPrompt = useCallback((keys, map) => {
		let str = "";
		for (let i = 0; i < keys.length; i++) {
			const fi = map[keys[i]];
			if (fi) str += `文件目录:\n${keys[i]}\n文件代码:\n${fi.codeString}\n\n`;
		}
		return str;
	}, []);

	const loadFileTree = useCallback(
		async (path, exc, clearChecked = false) => {
			if (!path.trim()) return;
			setLoading(true);
			try {
				const node = await fetchFileTree(path.trim(), exc || "");
				const map = {};
				const rootTreeNode = convertNode(node, map);
				setTreeData([rootTreeNode]);
				setCodeFilesMap(map);

				const suffixSet = {};
				const keys = Object.keys(map);
				for (let i = 0; i < keys.length; i++) {
					const suffix = map[keys[i]].suffix;
					if (suffix) suffixSet[suffix] = true;
				}
				const suffixes = Object.keys(suffixSet);
				const options = [];
				for (let i = 0; i < suffixes.length; i++) {
					options.push({ value: suffixes[i], label: suffixes[i] });
				}
				setSuffixOptions(options);

				if (clearChecked) {
					onConfigChange({ rootPath, exclude, checkedKeys: [] });
				}
				loadedPathRef.current = path;
			} catch (err) {
				message.error("加载文件树失败");
			} finally {
				setLoading(false);
			}
		},
		[exclude, onConfigChange, rootPath],
	);

	useEffect(() => {
		if (rootPath && rootPath !== loadedPathRef.current) {
			loadFileTree(rootPath, exclude, false);
		}
	}, [rootPath]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (Object.keys(codeFilesMap).length > 0) {
			const suffixMap = {};
			for (let i = 0; i < checkedKeys.length; i++) {
				const fi = codeFilesMap[checkedKeys[i]];
				if (fi) suffixMap[fi.suffix] = true;
			}
			setSelectedSuffixes(Object.keys(suffixMap));
			onPromptChange(buildPrompt(checkedKeys, codeFilesMap));
		}
	}, [checkedKeys, codeFilesMap, buildPrompt, onPromptChange]);

	const handlePathChange = (e) => {
		const newPath = e.target.value;
		onConfigChange({ rootPath: newPath, exclude, checkedKeys });
	};

	const handleExcludeChange = (e) => {
		const newExclude = e.target.value;
		onConfigChange({ rootPath, exclude: newExclude, checkedKeys });
	};

	const handleLoadClick = () => {
		if (!rootPath.trim()) {
			message.warning("请输入根文件目录");
			return;
		}
		loadFileTree(rootPath, exclude, true);
	};

	const handleSuffixChange = (suffixes) => {
		setSelectedSuffixes(suffixes);
		const newCheckedKeys = [];
		const allKeys = Object.keys(codeFilesMap);
		for (let i = 0; i < allKeys.length; i++) {
			const key = allKeys[i];
			const info = codeFilesMap[key];
			if (suffixes.includes(info.suffix)) newCheckedKeys.push(key);
		}
		onConfigChange({ rootPath, exclude, checkedKeys: newCheckedKeys });
	};

	const handleCheck = (keys) => {
		onConfigChange({ rootPath, exclude, checkedKeys: keys });
	};

	return (
		<div className={styles.promptCodeTree}>
			<div className={styles.promptCodeTreeForm}>
				<div className={styles.promptCodeTreeFormRow}>
					<Input
						placeholder="根文件目录，如 /Users/me/project/src"
						value={rootPath}
						onChange={handlePathChange}
						style={{ flex: 1 }}
					/>
				</div>
				<div className={styles.promptCodeTreeFormRow}>
					<Input
						placeholder="排除文件夹，逗号分割，如 node_modules,dist"
						value={exclude}
						onChange={handleExcludeChange}
						style={{ flex: 1 }}
					/>
					<Button type="primary" loading={loading} onClick={handleLoadClick}>
						加载
					</Button>
				</div>
			</div>
			{suffixOptions.length > 0 && (
				<Select
					mode="multiple"
					allowClear
					placeholder="按后缀筛选文件"
					value={selectedSuffixes}
					onChange={handleSuffixChange}
					options={suffixOptions}
					style={{ width: "100%" }}
				/>
			)}
			{treeData.length > 0 ? (
				<CFileTree treeData={treeData} checkedKeys={checkedKeys} onCheck={handleCheck} />
			) : (
				<div className={styles.promptCodeTreeEmpty}>请加载文件目录</div>
			)}
		</div>
	);
}
