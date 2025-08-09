import React, { useContext, useCallback, useEffect } from "react";
import { Tree } from "antd";

import { AnalysisResultContext } from "../../analysis_result.jsx";

import styles from "./code_files_tree.module.scss";

const fieldNames = { title: "name", key: "key", children: "children" };

const CodeFilesTree = () => {
	const {
		codeFilesMap,
		codeFilesTreeData,

		codeFilesTreeExpandedKeys,
		setCodeFilesTreeExpandedKeys,
		codeFilesTreeSelectedKeys,
		setCodeFilesTreeSelectedKeys,

		setSelectedCodeFile,
	} = useContext(AnalysisResultContext);
	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback((node) => {
		return <div className={styles.code_files_tree_node}>{node.name}</div>;
	}, []);
	/** tree 展开/收起节点时 */
	const handleOnTreeExpand = useCallback(
		(expandedKeys) => {
			setCodeFilesTreeExpandedKeys(expandedKeys);
		},
		[setCodeFilesTreeExpandedKeys]
	);
	/** 点击树节点触发 */
	const handleOnTreeSelect = useCallback(
		(selectedKeys) => {
			if (selectedKeys.length === 1) {
				setCodeFilesTreeSelectedKeys(selectedKeys);
			}
		},
		[setCodeFilesTreeSelectedKeys]
	);
	/** 监听选择 selectedCodeFile */
	useEffect(() => {
		setSelectedCodeFile?.(codeFilesMap?.[codeFilesTreeSelectedKeys[0]] ?? null);
	}, [codeFilesMap, codeFilesTreeSelectedKeys, setSelectedCodeFile]);

	return (
		<div className={styles.code_files}>
			{Array.isArray(codeFilesTreeData) && codeFilesTreeData.length > 0 ? (
				<Tree
					multiple={false}
					blockNode
					showLine
					titleRender={titleRender}
					expandedKeys={codeFilesTreeExpandedKeys}
					selectedKeys={codeFilesTreeSelectedKeys}
					onSelect={handleOnTreeSelect}
					onExpand={handleOnTreeExpand}
					treeData={codeFilesTreeData}
					fieldNames={fieldNames}
				/>
			) : null}
		</div>
	);
};
export default CodeFilesTree;
