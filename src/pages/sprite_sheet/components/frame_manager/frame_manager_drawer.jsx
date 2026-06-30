import { forwardRef, useImperativeHandle, useState, useCallback, useRef } from "react";
import { Drawer, Button, InputNumber, message } from "antd";
import { FrameTable } from "./frame_table.jsx";
import styles from "./frame_manager_drawer.module.scss";

/**
 * 帧管理抽屉（负责帧列表的增删改及批量生成）
 * @param {Object} props
 * @param {Function} props.onSave - 保存回调，参数为新帧数组
 * @param {React.Ref} ref
 */
export const FrameManagerDrawer = forwardRef((props, ref) => {
	const { onSave } = props;
	const [visible, setVisible] = useState(false);
	const [frames, setFrames] = useState([]);
	const [imgWidth, setImgWidth] = useState(0);
	const [imgHeight, setImgHeight] = useState(0);
	const [genCols, setGenCols] = useState(1);
	const [genRows, setGenRows] = useState(1);
	const [genOffsetX, setGenOffsetX] = useState(0);
	const [genOffsetY, setGenOffsetY] = useState(0);
	const [genGapX, setGenGapX] = useState(0);
	const [genGapY, setGenGapY] = useState(0);
	const idCounterRef = useRef(0);

	const generateId = useCallback(() => {
		idCounterRef.current += 1;
		return idCounterRef.current;
	}, []);

	useImperativeHandle(ref, () => ({
		open(imageWidth, imageHeight, currentFrames) {
			setVisible(true);
			setImgWidth(imageWidth);
			setImgHeight(imageHeight);
			idCounterRef.current = 0;
			const copied = [];
			for (let i = 0; i < currentFrames.length; i++) {
				const f = currentFrames[i];
				copied.push({ id: generateId(), x: f.x, y: f.y, w: f.w, h: f.h });
			}
			setFrames(copied);
		},
	}));

	const updateFrame = useCallback(
		(index, field, value) => {
			const next = [];
			for (let i = 0; i < frames.length; i++) {
				if (i === index) {
					next.push({ ...frames[i], [field]: value });
				} else {
					next.push(frames[i]);
				}
			}
			setFrames(next);
		},
		[frames],
	);

	const addFrame = useCallback(() => {
		const next = [];
		for (let i = 0; i < frames.length; i++) next.push(frames[i]);
		next.push({ id: generateId(), x: 0, y: 0, w: imgWidth, h: imgHeight });
		setFrames(next);
	}, [frames, imgWidth, imgHeight, generateId]);

	const deleteFrame = useCallback(
		(index) => {
			const next = [];
			for (let i = 0; i < frames.length; i++) {
				if (i !== index) next.push(frames[i]);
			}
			setFrames(next);
		},
		[frames],
	);

	const generateFrames = useCallback(() => {
		const cols = genCols;
		const rows = genRows;
		if (cols <= 0 || rows <= 0) {
			message.warning("列数和行数必须大于0");
			return;
		}
		const totalGapX = genGapX * (cols - 1);
		const totalGapY = genGapY * (rows - 1);
		const frameWidth = (imgWidth - genOffsetX - totalGapX) / cols;
		const frameHeight = (imgHeight - genOffsetY - totalGapY) / rows;

		if (frameWidth <= 0 || frameHeight <= 0) {
			message.warning(
				`根据当前参数计算出的帧宽(${frameWidth.toFixed(1)})或帧高(${frameHeight.toFixed(1)})无效，请调整列数、行数或间隙`,
			);
			return;
		}

		const newFrames = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const x = genOffsetX + col * (frameWidth + genGapX);
				const y = genOffsetY + row * (frameHeight + genGapY);
				if (x + frameWidth > imgWidth || y + frameHeight > imgHeight) {
					message.warning(`生成的帧 (${x.toFixed(1)}, ${y.toFixed(1)}) 可能超出图片边界`);
				}
				newFrames.push({
					id: generateId(),
					x: Math.round(x),
					y: Math.round(y),
					w: Math.round(frameWidth),
					h: Math.round(frameHeight),
				});
			}
		}
		setFrames(newFrames);
		message.success(`已生成 ${newFrames.length} 帧`);
	}, [genCols, genRows, genOffsetX, genOffsetY, genGapX, genGapY, imgWidth, imgHeight, generateId]);

	const handleSave = useCallback(() => {
		onSave(frames);
		setVisible(false);
	}, [frames, onSave]);

	return (
		<Drawer
			title="帧信息管理"
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
			<div className={styles.container}>
				<div className={styles.generateSection}>
					<div className={styles.sectionTitle}>批量生成</div>
					<div className={styles.fieldItem}>
						<span>列数：</span>
						<InputNumber size="small" min={1} value={genCols} onChange={setGenCols} className={styles.fieldInput} />
					</div>
					<div className={styles.fieldItem}>
						<span>行数：</span>
						<InputNumber size="small" min={1} value={genRows} onChange={setGenRows} className={styles.fieldInput} />
					</div>
					<div className={styles.fieldItem}>
						<span>起始 X：</span>
						<InputNumber size="small" value={genOffsetX} onChange={setGenOffsetX} className={styles.fieldInput} />
					</div>
					<div className={styles.fieldItem}>
						<span>起始 Y：</span>
						<InputNumber size="small" value={genOffsetY} onChange={setGenOffsetY} className={styles.fieldInput} />
					</div>
					<div className={styles.fieldItem}>
						<span>列间隙：</span>
						<InputNumber size="small" value={genGapX} onChange={setGenGapX} className={styles.fieldInput} />
					</div>
					<div className={styles.fieldItem}>
						<span>行间隙：</span>
						<InputNumber size="small" value={genGapY} onChange={setGenGapY} className={styles.fieldInput} />
					</div>
					<Button type="primary" size="small" onClick={generateFrames} className={styles.genBtn}>
						生成帧
					</Button>
				</div>
				<FrameTable frames={frames} onUpdate={updateFrame} onDelete={deleteFrame} onAdd={addFrame} />
			</div>
		</Drawer>
	);
});
