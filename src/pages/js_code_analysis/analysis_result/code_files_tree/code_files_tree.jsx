import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Tree } from "antd";

import styles from "./code_files_tree.module.scss";

const fieldNames = { title: "name", key: "key", children: "children" };

export default React.forwardRef(function CodeFilesTree(props = {}, ref) {
	const { onSelectedKeysChange = () => {} } = props;

	const [treeData, setTreeData] = useState([]);
	const [expandedKeys, setExpandedKeys] = useState([]);
	const [selectedKeys, setSelectedKeys] = useState([]);

	const titleRender = useCallback((node) => {
		return (
			<div className={styles.code_files_tree_node}>
				{node.name}
				{/* <div className={styles.code_files_tree_title}>{node.title}</div> */}
				{/* <div className={styles.code_files_tree_operations}>
					<Button type="text">11</Button>
				</div> */}
			</div>
		);
	}, []);

	const handleOnExpand = useCallback((expandedKeys) => {
		setExpandedKeys(expandedKeys);
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				setMessage(_treeData, _expandedKeys = expandedKeys, _selectedKey = selectedKeys) {
					setTreeData(_treeData);
					setExpandedKeys(_expandedKeys);
					setSelectedKeys(_selectedKey);
				},
				treeData,
				expandedKeys,
				selectedKeys,
			};
		},
		[expandedKeys, selectedKeys, treeData]
	);

	useEffect(() => {
		onSelectedKeysChange(selectedKeys);
	}, [onSelectedKeysChange, selectedKeys]);

	return (
		<div className={styles.code_files}>
			<div className={styles.code_files_tree}>
				{Array.isArray(treeData) && treeData.length > 0 ? (
					<Tree
						showLine
						titleRender={titleRender}
						defaultCheckedKeys={expandedKeys}
						expandedKeys={expandedKeys}
						selectedKeys={selectedKeys}
						onSelect={setSelectedKeys}
						onExpand={handleOnExpand}
						treeData={treeData}
						fieldNames={fieldNames}
					/>
				) : null}
			</div>
		</div>
	);
});
