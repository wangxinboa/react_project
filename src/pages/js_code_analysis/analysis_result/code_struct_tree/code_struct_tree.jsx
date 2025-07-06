import React, { useRef, useCallback, useImperativeHandle, useEffect, useState } from "react";
import { Tree, Button } from "antd";

import AddCodeStruct from "./add_code_struct.jsx";

import FileStruct from "./code_struct/file_struct.js";

import styles from "./code_struct_tree.module.scss";

let _codeFileKey_ = null;

export default React.forwardRef(function CodeStructTree(props, ref) {
	const { codeFile, codeStructMap } = props;

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
				<div className={styles.code_struct_tree_node}>
					<div className={styles.code_struct_tree_node_title}>{node.name}</div>
					<div className={styles.code_struct_tree_node_operations}>
						<Button
							className={styles.code_struct_tree_node_operation}
							type="text"
							size="small"
							onClick={() => {
								handleOnAddStruct(node);
							}}
						>
							添加结构
						</Button>
						<Button
							className={styles.code_struct_tree_node_operation}
							type="text"
							size="small"
							onClick={() => {
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
			return {};
		},
		[]
	);

	useEffect(() => {
		_codeFileKey_ = codeFile?.key;

		if (_codeFileKey_ && codeStructMap) {
			if (codeStructMap[_codeFileKey_] === void 0) {
				codeStructMap[_codeFileKey_] = new FileStruct(_codeFileKey_, codeFile.name);
			} else {
				codeStructMap[_codeFileKey_] = FileStruct.fromJSON(codeStructMap[_codeFileKey_]);
			}

			setTreeData([codeStructMap[_codeFileKey_]]);
		}

		_codeFileKey_ = null;
	}, [codeFile, codeStructMap]);

	return (
		<div className={styles.code_struct_tree}>
			<AddCodeStruct ref={addCodeStructRef} />
			{Array.isArray(treeData) && treeData.length > 0 ? (
				<Tree
					selectable={false}
					blockNode
					showLine
					titleRender={titleRender}
					// defaultCheckedKeys={expandedKeys}
					// expandedKeys={expandedKeys}
					// selectedKeys={selectedKeys}
					// onSelect={handleOnSelect}
					// onExpand={handleOnExpand}
					treeData={treeData}
					// fieldNames={fieldNames}
				/>
			) : null}
		</div>
	);
});
