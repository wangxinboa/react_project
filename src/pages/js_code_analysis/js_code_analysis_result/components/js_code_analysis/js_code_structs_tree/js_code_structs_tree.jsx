import { useCallback, useContext } from "react";
import { Tree } from "antd";

import JsCodeStructsTreeNode from "./js_code_structs_tree_node.jsx";
import useGetDomHeight from "../../../../../../hooks/use_get_dom_height.js";
import { JsCodeJsCodeAnalysisResultContext } from "../../../js_code_analysis_result.jsx";

import styles from "./js_code_structs_tree.module.scss";

const JsCodeStructsTree = () => {
	const { selectedCodeFile, codeStructsTreeData } = useContext(JsCodeJsCodeAnalysisResultContext);
	const { domRef: codeStructsTreeContainerDomRef, height: codeStructsTreeContainerDomHeight } = useGetDomHeight();

	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback((node) => {
		return <JsCodeStructsTreeNode codeStruct={node} />;
	}, []);

	return (
		<div className={styles.js_code_structs_tree_container} ref={codeStructsTreeContainerDomRef}>
			{Array.isArray(codeStructsTreeData) && codeStructsTreeData.length > 0 ? (
				<Tree
					key={selectedCodeFile?.key}
					multiple={false}
					blockNode
					showLine
					titleRender={titleRender}
					defaultExpandAll={true}
					treeData={codeStructsTreeData}
					height={codeStructsTreeContainerDomHeight}
				/>
			) : null}
		</div>
	);
};

export default JsCodeStructsTree;
