import { useCallback } from "react";
import { Tree } from "antd";

import styles from "./analysis_message.module.scss";

const CodeStructsUseTree = (props) => {
	const { treeData } = props;

	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback((node) => {
		return (
			<div className={styles.code_structs_used_tree_node}>
				<div className={styles.code_structs_used_tree_node_title}>{node.name}</div>
			</div>
		);
	}, []);
	return (
		<div className={styles.code_structs_used_tree}>
			<Tree multiple={false} blockNode showLine treeData={treeData} defaultExpandAll titleRender={titleRender} />
		</div>
	);
};

export default CodeStructsUseTree;
