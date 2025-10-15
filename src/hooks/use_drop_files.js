import { useState } from "react";

export default function useDropFiles(onDropFiles) {
	const [dragActive, setDragActive] = useState(false);
	// 处理拖拽事件
	const handleOnDrag = (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (event.type === "dragenter" || event.type === "dragover") {
			setDragActive(true);
		} else if (event.type === "dragleave") {
			setDragActive(false);
		}
	};

	// 处理文件放置
	const handleOnDrop = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setDragActive(false);

		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			onDropFiles?.(event.dataTransfer.files);
		}
	};

	return {
		dragActive,
		handleOnDrag,
		handleOnDrop,
	};
}
