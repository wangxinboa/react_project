import { useMemo } from "react";
import { Button, Table, InputNumber } from "antd";
import styles from "./frame_table.module.scss";

/**
 * 帧列表编辑表格（自适应高度，序号从 1 开始）
 * @param {Object} props
 * @param {AppType.SpriteFrame[]} props.frames - 帧数据数组（每项包含唯一 id）
 * @param {(index: number, field: string, value: number) => void} props.onUpdate - 更新帧属性回调
 * @param {(index: number) => void} props.onDelete - 删除帧回调
 * @param {() => void} props.onAdd - 添加空白帧回调
 */
export function FrameTable({ frames, onUpdate, onDelete, onAdd }) {
	const columns = useMemo(() => {
		return [
			{
				title: "序号",
				key: "frameIndex",
				width: 60,
				render: (_, __, index) => index + 1,
			},
			{
				title: "X",
				dataIndex: "x",
				width: 120,
				render: (_, record, index) => (
					<InputNumber
						size="small"
						className={styles.inputNumber}
						value={record.x}
						onChange={(v) => onUpdate(index, "x", v)}
					/>
				),
			},
			{
				title: "Y",
				dataIndex: "y",
				width: 120,
				render: (_, record, index) => (
					<InputNumber
						size="small"
						className={styles.inputNumber}
						value={record.y}
						onChange={(v) => onUpdate(index, "y", v)}
					/>
				),
			},
			{
				title: "W",
				dataIndex: "w",
				width: 120,
				render: (_, record, index) => (
					<InputNumber
						size="small"
						className={styles.inputNumber}
						value={record.w}
						onChange={(v) => onUpdate(index, "w", v)}
					/>
				),
			},
			{
				title: "H",
				dataIndex: "h",
				width: 120,
				render: (_, record, index) => (
					<InputNumber
						size="small"
						className={styles.inputNumber}
						value={record.h}
						onChange={(v) => onUpdate(index, "h", v)}
					/>
				),
			},
			{
				title: "操作",
				width: 60,
				render: (_, __, index) => (
					<Button size="small" danger onClick={() => onDelete(index)}>
						删除
					</Button>
				),
			},
		];
	}, [onDelete, onUpdate]);

	return (
		<div className={styles.frameTable}>
			<div className={styles.header}>
				<span className={styles.title}>帧列表（共 {frames.length} 帧）</span>
				<Button size="small" onClick={onAdd}>
					添加空白帧
				</Button>
			</div>
			<Table
				className={styles.table}
				rowKey="id"
				columns={columns}
				dataSource={frames}
				pagination={false}
				size="small"
			/>
		</div>
	);
}
