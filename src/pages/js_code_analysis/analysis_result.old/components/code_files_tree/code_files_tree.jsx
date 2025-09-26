import { useContext, useCallback } from "react";
import { Tree } from "antd";

import { AnalysisResultContext } from "../../analysis_result.jsx";

import styles from "./code_files_tree.module.scss";

const CodeFilesTree = () => {
	const {
		codeFilesTreeData,

		codeFilesTreeExpandedKeys,
		setCodeFilesTreeExpandedKeys,

		codeFilesTreeSelectedKeys,
		setCodeFilesTreeSelectedKeys,
	} = useContext(AnalysisResultContext);
	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback((node) => {
		return (
			<div className={styles.code_files_tree_node}>
				<div className={styles.code_structs_tree_node_title}>{node.name}</div>
			</div>
		);
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
				/>
			) : null}
		</div>
	);
};
export default CodeFilesTree;
