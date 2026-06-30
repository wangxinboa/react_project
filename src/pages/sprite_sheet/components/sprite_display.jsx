import { useRef, useEffect } from "react";
import styles from "./sprite_display.module.scss";

/** 动态帧预览最大尺寸 */
const MaxDynamicSize = 300;
/** 全图分布最大宽度 */
const MaxStaticWidth = 600;
/** 全图分布最大高度 */
const MaxStaticHeight = 400;

/**
 * Sprite Sheet 展示组件（Canvas 动态帧 + Canvas 全图）
 * @param {Object} props
 * @param {HTMLImageElement} props.image - 已加载的图片对象
 * @param {AppType.SpriteFrame[]} props.frames - 帧数据数组
 * @param {number} props.currentFrame - 当前帧索引
 */
export function SpriteDisplay({ image, frames, currentFrame }) {
	const staticCanvasRef = useRef(null);
	const dynamicCanvasRef = useRef(null);

	useEffect(() => {
		// 绘制静态全图及帧框
		const staticCanvas = staticCanvasRef.current;
		if (staticCanvas && image) {
			const scale = Math.min(MaxStaticWidth / image.naturalWidth, MaxStaticHeight / image.naturalHeight, 1);
			const displayWidth = image.naturalWidth * scale;
			const displayHeight = image.naturalHeight * scale;

			staticCanvas.width = displayWidth;
			staticCanvas.height = displayHeight;

			const ctx = staticCanvas.getContext("2d");
			ctx.clearRect(0, 0, displayWidth, displayHeight);
			ctx.drawImage(image, 0, 0, displayWidth, displayHeight);

			for (let i = 0; i < frames.length; i++) {
				const f = frames[i];
				ctx.beginPath();
				ctx.rect(f.x * scale, f.y * scale, f.w * scale, f.h * scale);
				ctx.strokeStyle = i === currentFrame ? "#1890ff" : "#999";
				ctx.lineWidth = i === currentFrame ? 2 : 1;
				ctx.stroke();
			}
		} else if (staticCanvas) {
			staticCanvas.width = 0;
			staticCanvas.height = 0;
		}

		// 绘制动态帧预览
		const dynamicCanvas = dynamicCanvasRef.current;
		if (dynamicCanvas && image && frames.length > 0 && currentFrame >= 0 && currentFrame < frames.length) {
			const frame = frames[currentFrame];
			const scale = Math.min(MaxDynamicSize / frame.w, MaxDynamicSize / frame.h, 1);
			const displayW = frame.w * scale;
			const displayH = frame.h * scale;

			dynamicCanvas.width = displayW;
			dynamicCanvas.height = displayH;

			const ctx = dynamicCanvas.getContext("2d");
			ctx.clearRect(0, 0, displayW, displayH);
			ctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, 0, 0, displayW, displayH);
		} else if (dynamicCanvas) {
			dynamicCanvas.width = 0;
			dynamicCanvas.height = 0;
		}
	}, [image, frames, currentFrame]);

	return (
		<div className={styles.displayContainer}>
			<div className={styles.dynamicSection}>
				<div className={styles.sectionLabel}>当前帧预览</div>
				<div className={styles.dynamicFrameWrapper}>
					{frames.length > 0 ? (
						<canvas ref={dynamicCanvasRef} className={styles.dynamicCanvas} />
					) : (
						<div className={styles.emptyFrame}>无帧数据</div>
					)}
				</div>
			</div>
			<div className={styles.staticSection}>
				<div className={styles.sectionLabel}>全图帧分布</div>
				<div className={styles.staticCanvasWrapper}>
					<canvas ref={staticCanvasRef} className={styles.staticCanvas} />
				</div>
			</div>
		</div>
	);
}
