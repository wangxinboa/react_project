import { forwardRef, useImperativeHandle, useState, useCallback } from "react";
import { Drawer, Input, Button, InputNumber, Tag, message } from "antd";
import styles from "./animation_drawer.module.scss";

/**
 * 动画编辑抽屉（新增/编辑）
 * @param {Object} props
 * @param {Function} props.onSave - 保存回调 (animData, editIndex?)
 * @param {string[]} props.existingNames - 当前已存在的动画名称列表（用于重名校验）
 * @param {React.Ref} ref
 */
export const AnimationDrawer = forwardRef((props, ref) => {
	const { onSave, existingNames = [] } = props;
	const [visible, setVisible] = useState(false);
	const [editIndex, setEditIndex] = useState(null);
	const [name, setName] = useState("");
	const [frameIds, setFrameIds] = useState([]);
	const [duration, setDuration] = useState(1000);
	const [singleFrameId, setSingleFrameId] = useState(0);
	const [startId, setStartId] = useState(0);
	const [endId, setEndId] = useState(0);
	const [maxFrameIndex, setMaxFrameIndex] = useState(0);

	useImperativeHandle(ref, () => ({
		open(animData, totalFrames, index) {
			setVisible(true);
			setMaxFrameIndex(totalFrames - 1);
			if (animData) {
				setEditIndex(index);
				setName(animData.name);
				setFrameIds([...animData.frameIds]);
				setDuration(animData.duration);
			} else {
				setEditIndex(null);
				setName("");
				setFrameIds([]);
				setDuration(1000);
			}
			setSingleFrameId(0);
			setStartId(0);
			setEndId(0);
		},
	}));

	const handleAddSingleFrame = useCallback(() => {
		if (singleFrameId < 0 || singleFrameId > maxFrameIndex) {
			message.warning("帧 ID 超出范围");
			return;
		}
		const next = [];
		for (let i = 0; i < frameIds.length; i++) next.push(frameIds[i]);
		next.push(singleFrameId);
		setFrameIds(next);
	}, [singleFrameId, maxFrameIndex, frameIds]);

	const handleAddRange = useCallback(() => {
		const s = Math.min(startId, endId);
		const e = Math.max(startId, endId);
		if (s < 0 || e > maxFrameIndex) {
			message.warning("帧 ID 超出范围");
			return;
		}
		const next = [];
		for (let i = 0; i < frameIds.length; i++) next.push(frameIds[i]);
		for (let id = s; id <= e; id++) {
			next.push(id);
		}
		setFrameIds(next);
	}, [startId, endId, maxFrameIndex, frameIds]);

	const removeFrameId = useCallback(
		(index) => {
			const next = [];
			for (let i = 0; i < frameIds.length; i++) {
				if (i !== index) next.push(frameIds[i]);
			}
			setFrameIds(next);
		},
		[frameIds],
	);

	const handleSave = useCallback(() => {
		if (!name.trim()) {
			message.warning("请输入动画名称");
			return;
		}
		const lowerName = name.trim().toLowerCase();
		for (let i = 0; i < existingNames.length; i++) {
			if (existingNames[i].toLowerCase() === lowerName) {
				if (editIndex === null || i !== editIndex) {
					message.warning("动画名称重复，请修改");
					return;
				}
			}
		}
		if (frameIds.length === 0) {
			message.warning("请添加至少一帧");
			return;
		}
		onSave({ name: name.trim(), frameIds: [...frameIds], duration }, editIndex);
		setVisible(false);
	}, [name, frameIds, duration, existingNames, editIndex, onSave]);

	return (
		<Drawer
			title={editIndex !== null ? "编辑动画" : "新增动画"}
			placement="right"
			size={700}
			open={visible}
			onClose={() => setVisible(false)}
			footer={
				<div className={styles.drawerFooter}>
					<Button onClick={() => setVisible(false)}>取消</Button>
					<Button type="primary" onClick={handleSave}>
						保存
					</Button>
				</div>
			}
		>
			<div className={styles.form}>
				<div className={styles.formItem}>
					<span className={styles.label}>动画名称：</span>
					<Input value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<div className={styles.formItem}>
					<span className={styles.label}>总时长 (ms)：</span>
					<InputNumber className={styles.inputFull} min={1} value={duration} onChange={setDuration} />
				</div>

				<div className={styles.frameSection}>
					<div className={styles.sectionTitle}>帧序列管理（当前：{frameIds.join(", ") || "无"}）</div>
					<div className={styles.frameInputGroup}>
						<div className={styles.frameIdInput}>
							<span>帧 ID：</span>
							<InputNumber min={0} max={maxFrameIndex} value={singleFrameId} onChange={setSingleFrameId} />
						</div>
						<Button onClick={handleAddSingleFrame}>添加单帧</Button>
					</div>
					<div className={styles.frameInputGroup}>
						<div className={styles.frameIdInput}>
							<span>起始：</span>
							<InputNumber min={0} max={maxFrameIndex} value={startId} onChange={setStartId} />
						</div>
						<div className={styles.frameIdInput}>
							<span>结束：</span>
							<InputNumber min={0} max={maxFrameIndex} value={endId} onChange={setEndId} />
						</div>
						<Button onClick={handleAddRange}>添加范围</Button>
					</div>
					{frameIds.length > 0 && (
						<div className={styles.frameIdList}>
							{frameIds.map((id, idx) => (
								<Tag key={idx} closable onClose={() => removeFrameId(idx)}>
									{id}
								</Tag>
							))}
						</div>
					)}
				</div>
			</div>
		</Drawer>
	);
});
