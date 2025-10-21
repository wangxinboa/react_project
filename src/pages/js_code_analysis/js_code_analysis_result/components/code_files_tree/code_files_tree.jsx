import { useContext, useCallback } from "react";
import { Tree } from "antd";

import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";
import CodeFilesTreeNode from "./code_files_tree_node.jsx";
import useGetDomHeight from "../../../../../hooks/use_get_dom_height.js";

import styles from "./code_files_tree.module.scss";

const CodeFilesTree = () => {
	const {
		codeFilesMap,
		codeFilesTreeData,

		codeFilesTreeExpandedKeys,
		setCodeFilesTreeExpandedKeys,

		codeFilesTreeSelectedKeys,
		onSetCodeFilesTreeSelectedKeys,
	} = useContext(JsCodeJsCodeAnalysisResultContext);

	const { domRef: codeFilesTreeContainerDomRef, height: codeFilesTreeContainerDomHeight } = useGetDomHeight();

	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback((node) => {
		return <CodeFilesTreeNode codeFile={node} />;
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
				onSetCodeFilesTreeSelectedKeys(selectedKeys, codeFilesMap);
			}
		},
		[onSetCodeFilesTreeSelectedKeys, codeFilesMap]
	);

	return (
		<div className={styles.code_files} ref={codeFilesTreeContainerDomRef}>
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
					height={codeFilesTreeContainerDomHeight}
				/>
			) : null}
		</div>
	);
};
export default CodeFilesTree;
