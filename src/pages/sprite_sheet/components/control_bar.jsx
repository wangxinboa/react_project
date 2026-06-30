import { Button, InputNumber } from "antd";
import styles from "./control_bar.module.scss";

/**
 * Sprite Sheet 控制栏组件（帧切换、播放控制）
 * @param {Object} props
 * @param {number} props.totalFrames - 总帧数
 * @param {number} props.currentFrame - 当前帧索引
 * @param {(val: number) => void} props.onFrameChange - 当前帧变更回调
 * @param {number} props.frameInterval - 播放间隔（毫秒）
 * @param {(val: number) => void} props.onIntervalChange - 间隔变更回调
 * @param {boolean} props.isPlaying - 是否正在播放
 * @param {() => void} props.onTogglePlay - 开始/停止播放回调
 */
export function ControlBar({
	totalFrames,
	currentFrame,
	onFrameChange,
	frameInterval,
	onIntervalChange,
	isPlaying,
	onTogglePlay,
}) {
	return (
		<div className={styles.controlBar}>
			<span>总帧数：{totalFrames}</span>
			<span>
				当前帧：
				<InputNumber
					className={styles.inputFrameIndex}
					min={0}
					max={totalFrames - 1}
					value={currentFrame}
					onChange={onFrameChange}
					disabled={totalFrames === 0}
				/>
			</span>
			<span>
				播放间隔(ms)：
				<InputNumber
					className={styles.inputInterval}
					min={10}
					step={10}
					value={frameInterval}
					onChange={onIntervalChange}
				/>
			</span>
			<Button type={isPlaying ? "default" : "primary"} onClick={onTogglePlay} disabled={totalFrames === 0}>
				{isPlaying ? "停止播放" : "自动播放"}
			</Button>
		</div>
	);
}
