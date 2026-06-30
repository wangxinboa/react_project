import { useState, useCallback, useEffect, useRef } from "react";
import { Button, message } from "antd";
import { CFileUpload } from "../../components/c_file_upload/c_file_upload.jsx";
import { FrameManagerDrawer } from "./components/frame_manager/frame_manager_drawer.jsx";
import { AnimationDrawer } from "./components/animation_drawer.jsx";
import { SpriteDisplay } from "./components/sprite_display.jsx";
import { ControlBar } from "./components/control_bar.jsx";
import styles from "./sprite_sheet.module.scss";

/** 默认帧间隔（毫秒），用于自动播放 */
const DefaultFrameInterval = 100;

/**
 * Sprite Sheet 测试主页面
 * @component
 */
export function SpriteSheet() {
	// 图片对象（HTMLImageElement）
	const [image, setImage] = useState(null);

	// 帧列表
	const [frames, setFrames] = useState([]);
	// 当前帧索引（0-based）
	const [currentFrame, setCurrentFrame] = useState(0);
	// 自动播放状态
	const [isPlaying, setIsPlaying] = useState(false);
	const playTimerRef = useRef(null);

	// 自动播放间隔（毫秒）
	const [frameInterval, setFrameInterval] = useState(DefaultFrameInterval);

	// 动画列表
	const [animations, setAnimations] = useState([]);

	// 子组件 ref
	const frameDrawerRef = useRef(null);
	const animDrawerRef = useRef(null);

	// 保存最新 currentFrame 和 frames.length 的 ref，用于 setInterval 回调
	const currentFrameRef = useRef(currentFrame);
	const framesLengthRef = useRef(frames.length);

	/** 同时更新 currentFrame 状态和 ref */
	const updateCurrentFrame = useCallback((val) => {
		currentFrameRef.current = val;
		setCurrentFrame(val);
	}, []);

	/** 同时更新 frames 状态和 ref */
	const updateFrames = useCallback((newFrames) => {
		framesLengthRef.current = newFrames.length;
		setFrames(newFrames);
	}, []);

	/** 停止自动播放并清理定时器 */
	const stopAutoPlay = useCallback(() => {
		if (playTimerRef.current) {
			clearInterval(playTimerRef.current);
			playTimerRef.current = null;
		}
		setIsPlaying(false);
	}, []);

	/** 图片上传处理（读取为 Image 对象） */
	const handleImageUpload = useCallback(
		(e) => {
			const file = e.target.files?.[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = () => {
				const base64 = reader.result;
				const img = new Image();
				img.onload = () => {
					setImage(img);
					updateFrames([]);
					updateCurrentFrame(0);
					setAnimations([]);
					stopAutoPlay();
				};
				img.onerror = () => {
					message.error("图片加载失败，请重新选择");
				};
				img.src = base64;
			};
			reader.onerror = () => {
				message.error("文件读取失败");
			};
			reader.readAsDataURL(file);
			e.target.value = "";
		},
		[stopAutoPlay, updateCurrentFrame, updateFrames],
	);

	/** 自动播放下一帧（基于 ref 避免闭包过期） */
	const playNextFrame = useCallback(() => {
		const len = framesLengthRef.current;
		if (len === 0) return;
		const nextFrame = (currentFrameRef.current + 1) % len;
		updateCurrentFrame(nextFrame);
	}, [updateCurrentFrame]);

	/** 开始/停止自动播放 */
	const toggleAutoPlay = useCallback(() => {
		if (isPlaying) {
			stopAutoPlay();
		} else {
			if (frames.length === 0) {
				message.warning("请先设置帧信息");
				return;
			}
			stopAutoPlay();
			const interval = frameInterval > 0 ? frameInterval : DefaultFrameInterval;
			playTimerRef.current = setInterval(playNextFrame, interval);
			setIsPlaying(true);
		}
	}, [isPlaying, frames.length, stopAutoPlay, playNextFrame, frameInterval]);

	/** 手动切换帧 */
	const handleFrameChange = useCallback(
		(val) => {
			if (val >= 0 && val < frames.length) {
				updateCurrentFrame(val);
			}
		},
		[frames.length, updateCurrentFrame],
	);

	/** 打开帧管理抽屉 */
	const openFrameManager = useCallback(() => {
		if (!image) return;
		frameDrawerRef.current?.open(image.naturalWidth, image.naturalHeight, frames);
	}, [image, frames]);

	/** 帧管理保存回调 */
	const handleFramesSave = useCallback(
		(newFrames) => {
			updateFrames(newFrames);
			if (newFrames.length === 0) {
				updateCurrentFrame(0);
			} else if (currentFrame >= newFrames.length) {
				updateCurrentFrame(newFrames.length - 1);
			}
		},
		[currentFrame, updateCurrentFrame, updateFrames],
	);

	/** 打开动画编辑抽屉（新建） */
	const openAddAnimation = useCallback(() => {
		animDrawerRef.current?.open(null, frames.length);
	}, [frames.length]);

	/** 打开动画编辑抽屉（编辑） */
	const handleEditAnimation = useCallback(
		(anim, index) => {
			animDrawerRef.current?.open(anim, frames.length, index);
		},
		[frames.length],
	);

	/** 动画保存回调 */
	const handleAnimationSave = useCallback(
		(animData, editIndex) => {
			const next = [];
			for (let i = 0; i < animations.length; i++) {
				if (i === editIndex) {
					next.push(animData);
				} else {
					next.push(animations[i]);
				}
			}
			if (editIndex === null || editIndex === undefined) {
				next.push(animData);
			}
			setAnimations(next);
		},
		[animations],
	);

	/** 删除动画 */
	const handleDeleteAnimation = useCallback(
		(index) => {
			const next = [];
			for (let i = 0; i < animations.length; i++) {
				if (i !== index) next.push(animations[i]);
			}
			setAnimations(next);
		},
		[animations],
	);

	/** 执行指定动画 */
	const handlePlayAnimation = useCallback(
		(anim) => {
			if (anim.frameIds.length === 0) return;
			stopAutoPlay();
			let step = 0;
			const interval = anim.duration / anim.frameIds.length;
			updateCurrentFrame(anim.frameIds[0]);
			playTimerRef.current = setInterval(() => {
				step++;
				if (step < anim.frameIds.length) {
					updateCurrentFrame(anim.frameIds[step]);
				} else {
					clearInterval(playTimerRef.current);
					playTimerRef.current = null;
					setIsPlaying(false);
				}
			}, interval);
			setIsPlaying(true);
		},
		[stopAutoPlay, updateCurrentFrame],
	);

	/** 组件卸载时清除定时器 */
	useEffect(() => {
		return () => {
			if (playTimerRef.current) clearInterval(playTimerRef.current);
		};
	}, []);

	return (
		<div className={styles.spriteSheetPage}>
			<div className={styles.toolbar}>
				<Button type="primary">
					选择 Sprite Sheet 图片
					<CFileUpload onInput={handleImageUpload} accept="image/*" />
				</Button>
				<Button disabled={!image} onClick={openFrameManager}>
					设置帧信息
				</Button>
				<Button disabled={frames.length === 0} onClick={openAddAnimation}>
					添加动画
				</Button>
			</div>
			{image && (
				<ControlBar
					totalFrames={frames.length}
					currentFrame={currentFrame}
					onFrameChange={handleFrameChange}
					frameInterval={frameInterval}
					onIntervalChange={setFrameInterval}
					isPlaying={isPlaying}
					onTogglePlay={toggleAutoPlay}
				/>
			)}
			{image && <SpriteDisplay image={image} frames={frames} currentFrame={currentFrame} />}
			{image && animations.length > 0 && (
				<div className={styles.animationList}>
					<div className={styles.animationListTitle}>动画列表</div>
					{animations.map((anim, i) => {
						return (
							<div key={i} className={styles.animationItem}>
								<span className={styles.animationName}>{anim.name}</span>
								<span className={styles.animationInfo}>
									帧序列：[{anim.frameIds.join(", ")}] | 时长：{anim.duration}ms
								</span>
								<div className={styles.animationActions}>
									<Button size="small" onClick={() => handlePlayAnimation(anim)}>
										执行
									</Button>
									<Button size="small" onClick={() => handleEditAnimation(anim, i)}>
										编辑
									</Button>
									<Button size="small" danger onClick={() => handleDeleteAnimation(i)}>
										删除
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			)}
			{!image && <div className={styles.emptyTip}>请上传一张 Sprite Sheet 图片以开始</div>}
			<FrameManagerDrawer ref={frameDrawerRef} onSave={handleFramesSave} />
			<AnimationDrawer ref={animDrawerRef} onSave={handleAnimationSave} existingNames={animations.map((a) => a.name)} />
		</div>
	);
}
