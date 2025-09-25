import { useCallback } from "react";
import { Tree } from "antd";

import styles from "./analysis_message.module.scss";

const CodeStructsUsedTree = (props) => {
	const { treeData, openFileInVsCode, deleteUsedCodeStruct, addNextUsedCodeStruct } = props;

	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback(
		(node) => {
			return (
				<div className={styles.code_structs_used_tree_node}>
					<div className={styles.code_structs_used_tree_node_title}>{node.name}</div>
					<div className={styles.code_structs_used_tree_node_operations}>
						{node?.isUsedCodeFileStruct ? (
							<div
								className={styles.code_structs_used_tree_node_operation}
								type="text"
								size="small"
								onClick={() => {
									openFileInVsCode(node);
								}}
							>
								跳转 vscode
							</div>
						) : null}
						{node?.isUsedCodeStruct ? (
							<div
								className={styles.code_structs_used_tree_node_operation}
								type="text"
								size="small"
								onClick={() => {
									addNextUsedCodeStruct(node);
								}}
							>
								添加后续调用
							</div>
						) : null}
						{node?.isUsedCodeFileStruct ? null : (
							<div
								className={styles.code_structs_used_tree_node_operation}
								type="text"
								size="small"
								onClick={() => {
									deleteUsedCodeStruct(node);
								}}
							>
								删除
							</div>
						)}
					</div>
				</div>
			);
		},
		[addNextUsedCodeStruct, deleteUsedCodeStruct, openFileInVsCode]
	);
	return (
		<div className={styles.code_structs_used_tree}>
			<Tree multiple={false} blockNode showLine treeData={treeData} defaultExpandAll titleRender={titleRender} />
		</div>
	);
};

export default CodeStructsUsedTree;
