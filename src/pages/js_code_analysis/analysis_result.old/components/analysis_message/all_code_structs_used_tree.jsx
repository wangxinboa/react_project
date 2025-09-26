import { forwardRef, useState, useImperativeHandle, useCallback, useContext } from "react";
import { Drawer, Tree } from "antd";

import { AnalysisResultContext } from "../../analysis_result.jsx";

import styles from "./analysis_message.module.scss";

const AllCodeStructsUsedTree = forwardRef((props, ref) => {
	const { deleteUsedCodeStruct } = props;

	const [drawerVisible, setDrawerVisible] = useState(false);
	const { codeStructAnalysisMap } = useContext(AnalysisResultContext);

	const [allCodeStructsUsedTreeData, setAllCodeStructsUsedTree] = useState([]);
	/** 关闭展示所有代码被调用信息*/
	const handleOnDrawerClose = useCallback(() => {
		setDrawerVisible(false);
	}, []);

	/** 自定义渲染 tree 节点 */
	const titleRender = useCallback(
		(node) => {
			return (
				<div className={styles.code_structs_used_tree_node}>
					<div className={styles.code_structs_used_tree_node_title}>{node.name}</div>
					<div className={styles.code_structs_used_tree_node_operations}>
						{node?.isUsedCodeFileStruct || node?.isCodeStructAnalysis ? null : (
							<div
								className={styles.code_structs_used_tree_node_operation}
								type="text"
								size="small"
								onClick={() => {
									setAllCodeStructsUsedTree(Object.values(codeStructAnalysisMap));
									deleteUsedCodeStruct?.(node);
								}}
							>
								删除
							</div>
						)}
					</div>
				</div>
			);
		},
		[codeStructAnalysisMap, deleteUsedCodeStruct]
	);

	useImperativeHandle(
		ref,
		() => {
			return {
				showAllCodeStructsUsedTree() {
					setAllCodeStructsUsedTree(Object.values(codeStructAnalysisMap));
					setDrawerVisible(true);
				},
			};
		},
		[codeStructAnalysisMap]
	);
	return (
		<Drawer
			title={"所有代码被调用信息"}
			placement="left"
			width={1000}
			open={drawerVisible}
			onClose={handleOnDrawerClose}
		>
			<div className={styles.code_structs_used_tree}>
				<Tree
					multiple={false}
					blockNode
					showLine
					treeData={allCodeStructsUsedTreeData}
					defaultExpandAll={true}
					titleRender={titleRender}
				/>
			</div>
		</Drawer>
	);
});

export default AllCodeStructsUsedTree;
