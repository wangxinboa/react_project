import React, { useRef, useCallback, useImperativeHandle, useState } from "react";
import { Tree, Button } from "antd";

import AddCodeStruct from "./add_code_struct.jsx";

import styles from "./code_structs_tree.module.scss";

const CodeStructsTree = React.forwardRef(function CodeStructsTree(_, ref) {
	const addCodeStructRef = useRef(null);

	const [treeData, setTreeData] = useState(null);

	const handleOnAddStruct = useCallback((node) => {
		addCodeStructRef.current.setModalParentCodeStruct(node);
	}, []);

	const handleOnViewCitation = useCallback((node) => {
		// addCodeStructRef.current.setModalParentCodeStruct(node);
	}, []);

	const titleRender = useCallback(
		(node) => {
			return (
				<div className={styles.code_structs_tree_node}>
					<div className={styles.code_structs_tree_node_type}>{node.type}</div>
					<div className={styles.code_structs_tree_node_title}>{node.name}</div>
					<div className={styles.code_structs_tree_node_operations}>
						<Button
							className={styles.code_structs_tree_node_operation}
							type="text"
							size="small"
							onClick={() => {
								handleOnAddStruct(node);
							}}
						>
							添加结构
						</Button>
						<Button
							className={styles.code_structs_tree_node_operation}
							type="text"
							size="small"
							onClick={() => {
								// todo: 测试用, 待删除
								window.node = node;
								handleOnViewCitation(node);
							}}
						>
							查看引用
						</Button>
					</div>
				</div>
			);
		},
		[handleOnAddStruct, handleOnViewCitation]
	);

	useImperativeHandle(
		ref,
		() => {
			return {
				setData(_treeData) {
					setTreeData(_treeData);
				},
			};
		},
		[]
	);

	return (
		<div className={styles.code_structs_tree}>
			<AddCodeStruct
				ref={addCodeStructRef}
				onFinish={() => {
					setTreeData([...treeData]);
				}}
			/>
			{Array.isArray(treeData) && treeData.length > 0 ? (
				<Tree
					selectable={false}
					blockNode
					showLine
					titleRender={titleRender}
					defaultExpandAll={true}
					treeData={treeData}
				/>
			) : null}
		</div>
	);
});

export default CodeStructsTree;
