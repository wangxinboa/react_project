import { Tree } from "antd";
import styles from "./c_file_tree.module.scss";

/**
 * 文件树展示组件
 * @param {Object} props
 * @param {Object[]} props.treeData - antd Tree 的树数据
 * @param {string[]} props.checkedKeys - 受控勾选 key 列表
 * @param {(checkedKeys: string[]) => void} props.onCheck - 勾选变化回调
 * @returns {JSX.Element}
 */
export function CFileTree({ treeData, checkedKeys, onCheck }) {
	return (
		<div className={styles.cFileTreeContainer}>
			<Tree checkable showLine blockNode treeData={treeData} checkedKeys={checkedKeys} onCheck={onCheck} />
		</div>
	);
}
