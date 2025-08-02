import React, { useRef, useCallback, useImperativeHandle, useState } from "react";
import { Tree } from "antd";

import AddCodeStruct from "./add_code_struct.jsx";

import styles from "./code_structs_tree.module.scss";

let _treeDragNode_ = null;
let _treeDragParentNode_ = null;
let _dropPosition_ = null;
let _treeDragNodeIndex_ = null;

const CodeStructsTree = React.forwardRef(function CodeStructsTree(_, ref) {
	const addCodeStructRef = useRef(null);

	const [treeData, setTreeData] = useState(null);
	const [treeSelectedKeys, setTreeSelectedKeys] = useState([]);

	const renderByTreeData = useCallback(() => {
		setTreeData([...treeData]);
	}, [treeData]);

	const treeAllowDrop = useCallback((info) => {
		if (info.dropPosition === 0 && info.dragNode.parent !== info.dropNode) {
			return false;
		}
		return true;
	}, []);
	const handleOnTreeDrop = useCallback(
		(info) => {
			_treeDragNode_ = info.dragNode.map[info.dragNode.key];
			_treeDragParentNode_ = _treeDragNode_.parent;
			/** 目标位置 */
			_dropPosition_ = info.dropPosition;
			/** 原来位置 */
			_treeDragNodeIndex_ = _treeDragParentNode_.children.indexOf(_treeDragNode_);

			if (_treeDragNodeIndex_ > -1) {
				if (_dropPosition_ < _treeDragNodeIndex_) {
					_treeDragParentNode_.children.splice(_treeDragNodeIndex_, 1);
					_treeDragParentNode_.children.splice(_dropPosition_, 0, _treeDragNode_);
				} else {
					_treeDragParentNode_.children.splice(_dropPosition_, 0, _treeDragNode_);
					_treeDragParentNode_.children.splice(_treeDragNodeIndex_, 1);
				}
			}

			renderByTreeData();
		},
		[renderByTreeData]
	);
	const handleOnTreeSelect = useCallback((_selectedKeys) => {
		if (_selectedKeys.length === 1) {
			setTreeSelectedKeys(_selectedKeys);
		}
	}, []);

	const handleOnAddStruct = useCallback((node) => {
		addCodeStructRef.current.setModalParentCodeStruct(node);
	}, []);

	const handleOnDelStruct = useCallback(
		(node) => {
			node?.remove();
			renderByTreeData();
		},
		[renderByTreeData]
	);
	const titleRender = useCallback(
		(node) => {
			return (
				<div className={styles.code_structs_tree_node}>
					<div className={styles.code_structs_tree_node_type}>{node.type}</div>
					<div className={styles.code_structs_tree_node_title}>{node.name}</div>
					<div className={styles.code_structs_tree_node_operations}>
						<div
							className={styles.code_structs_tree_node_operation}
							type="text"
							size="small"
							onClick={() => {
								handleOnAddStruct(node);
							}}
						>
							添加结构
						</div>
						<div
							className={styles.code_structs_tree_node_operation}
							type="text"
							size="small"
							onClick={() => {
								handleOnDelStruct(node);
							}}
						>
							删除
						</div>
					</div>
				</div>
			);
		},
		[handleOnAddStruct, handleOnDelStruct]
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
			<AddCodeStruct ref={addCodeStructRef} onFinish={renderByTreeData} />
			{Array.isArray(treeData) && treeData.length > 0 ? (
				<Tree
					allowDrop={treeAllowDrop}
					onDrop={handleOnTreeDrop}
					selectedKeys={treeSelectedKeys}
					onSelect={handleOnTreeSelect}
					draggable
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
