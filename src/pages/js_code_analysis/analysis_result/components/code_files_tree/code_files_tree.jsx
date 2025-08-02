import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Tree } from "antd";

import styles from "./code_files_tree.module.scss";

const fieldNames = { title: "name", key: "key", children: "children" };

export default React.forwardRef(function CodeFilesTree(props = {}, ref) {
	const { onSelectedKeysChange } = props;

	const [treeData, setTreeData] = useState([]);
	const [treeExpandedKeys, setTreeExpandedKeys] = useState([]);
	const [treeSelectedKeys, setTreeSelectedKeys] = useState([]);

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

	const handleOnTreeExpand = useCallback((expandedKeys) => {
		setTreeExpandedKeys(expandedKeys);
	}, []);

	const handleOnTreeSelect = useCallback((selectedKeys) => {
		if (selectedKeys.length === 1) {
			setTreeSelectedKeys(selectedKeys);
		}
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				setData(_treeData = [], _expandedKeys = treeExpandedKeys, _selectedKey = treeSelectedKeys) {
					setTreeData(_treeData);
					setTreeExpandedKeys(_expandedKeys);
					setTreeSelectedKeys(_selectedKey);
				},
				treeData,
				expandedKeys: treeExpandedKeys,
				selectedKeys: treeSelectedKeys,
			};
		},
		[treeData, treeExpandedKeys, treeSelectedKeys]
	);

	useEffect(() => {
		onSelectedKeysChange?.(treeSelectedKeys);
	}, [onSelectedKeysChange, treeSelectedKeys]);

	return (
		<div className={styles.code_files}>
			{Array.isArray(treeData) && treeData.length > 0 ? (
				<Tree
					blockNode
					showLine
					titleRender={titleRender}
					defaultCheckedKeys={treeExpandedKeys}
					expandedKeys={treeExpandedKeys}
					selectedKeys={treeSelectedKeys}
					onSelect={handleOnTreeSelect}
					onExpand={handleOnTreeExpand}
					treeData={treeData}
					fieldNames={fieldNames}
				/>
			) : null}
		</div>
	);
});
