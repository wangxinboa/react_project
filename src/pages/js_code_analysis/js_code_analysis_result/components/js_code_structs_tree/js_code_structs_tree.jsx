import { useCallback, useContext } from "react";
import { Tree } from "antd";

import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";

import styles from "./js_code_structs_tree.module.scss";
import JsCodeStructsTreeNode from "./js_code_structs_tree_node.jsx";

const JsCodeStructsTree = () => {
	const { codeStructsMap, codeStructsTreeData, codeStructsTreeSelectedKeys, onSetCodeStructsTreeSelectedKeys } =
		useContext(JsCodeJsCodeAnalysisResultContext);

	/** Tree 组件选择节点 */
	const handleOnTreeSelect = useCallback(
		(_selectedKeys) => {
			if (_selectedKeys.length === 1) {
				onSetCodeStructsTreeSelectedKeys(_selectedKeys, codeStructsMap);
			}
		},
		[codeStructsMap, onSetCodeStructsTreeSelectedKeys]
	);
	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback((node) => {
		return <JsCodeStructsTreeNode codeStruct={node} />;
	}, []);

	return (
		<div className={styles.js_code_structs_tree}>
			{Array.isArray(codeStructsTreeData) && codeStructsTreeData.length > 0 ? (
				<Tree
					multiple={false}
					selectedKeys={codeStructsTreeSelectedKeys}
					onSelect={handleOnTreeSelect}
					blockNode
					showLine
					titleRender={titleRender}
					// defaultExpandAll={true}
					treeData={codeStructsTreeData}
				/>
			) : null}
		</div>
	);
};

export default JsCodeStructsTree;
