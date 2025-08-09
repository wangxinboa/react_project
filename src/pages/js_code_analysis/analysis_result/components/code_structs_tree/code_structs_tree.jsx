import { useRef, useCallback, useContext, useEffect } from "react";
import { Tree } from "antd";

import { AnalysisResultContext } from "../../analysis_result.jsx";
import AddCodeStruct from "./add_code_struct.jsx";

import styles from "./code_structs_tree.module.scss";

let _treeDragNode_ = null;
let _treeDragParentNode_ = null;
let _dropPosition_ = null;
let _treeDragNodeIndex_ = null;

const CodeStructsTree = () => {
	const {
		codeStructsTreeData,
		setCodeStructsTreeData,
		codeStructsTreeSelectedKeys,
		setCodeStructsTreeSelectedKeys,
		codeStructsMap,
		setSelectedCodeStruct,
	} = useContext(AnalysisResultContext);

	const addCodeStructRef = useRef(null);

	/** Tree 组件重新渲染内部节点 */
	const renderByTreeData = useCallback(() => {
		setCodeStructsTreeData([...codeStructsTreeData]);
	}, [codeStructsTreeData, setCodeStructsTreeData]);
	/** AddCodeStruct 添加新代码结构节点完成 */
	const handleOnAddCodeStructFinish = useCallback(
		(node) => {
			renderByTreeData();
		},
		[renderByTreeData]
	);
	/** Tree 组件内节点是否允许拖拽的判断 */
	const treeAllowDrop = useCallback((info) => {
		if (info.dropPosition === 0 && info.dragNode.parent !== info.dropNode) {
			return false;
		}
		return true;
	}, []);
	/** Tree 组件节点拖拽操作结束 */
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
	/** Tree 组件选择节点 */
	const handleOnTreeSelect = useCallback(
		(_selectedKeys) => {
			if (_selectedKeys.length === 1) {
				setCodeStructsTreeSelectedKeys(_selectedKeys);
			}
		},
		[setCodeStructsTreeSelectedKeys]
	);
	/** 点击添加代码结构 */
	const handleOnAddStruct = useCallback((node) => {
		addCodeStructRef.current.setModalParentCodeStruct(node);
	}, []);
	/** 点击删除代码结构 */
	const handleOnDelStruct = useCallback(
		(node) => {
			node?.remove();
			renderByTreeData();
		},
		[renderByTreeData]
	);
	/** 自定义渲染 tree 节点 */
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

	/** 监听选择 selectedCodeStruct */
	useEffect(() => {
		setSelectedCodeStruct?.(codeStructsMap?.[codeStructsTreeSelectedKeys[0]] ?? null);
	}, [codeStructsMap, codeStructsTreeSelectedKeys, setSelectedCodeStruct]);

	return (
		<div className={styles.code_structs_tree}>
			<AddCodeStruct ref={addCodeStructRef} onFinish={handleOnAddCodeStructFinish} />
			{Array.isArray(codeStructsTreeData) && codeStructsTreeData.length > 0 ? (
				<Tree
					multiple={false}
					allowDrop={treeAllowDrop}
					onDrop={handleOnTreeDrop}
					selectedKeys={codeStructsTreeSelectedKeys}
					onSelect={handleOnTreeSelect}
					draggable
					blockNode
					showLine
					titleRender={titleRender}
					defaultExpandAll={true}
					treeData={codeStructsTreeData}
				/>
			) : null}
		</div>
	);
};

export default CodeStructsTree;
