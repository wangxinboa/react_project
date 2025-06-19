import { useEffect, useRef } from "react";
import "./ast_viewer.scss";

export default function ASTViewer(props) {
	const { astJson = {} } = props;
	const editorRef = useRef({});

	useEffect(() => {
		const editor = window.ace.edit("astViewer");

		// 基础配置
		editor.setTheme("ace/theme/monokai"); // 主题
		editor.session.setMode("ace/mode/json"); // 语言模式
		editor.setFontSize(14); // 字体大小

		editorRef.current.editor = editor;
	}, []);

	useEffect(() => {
		try {
			editorRef.current.editor.setValue(JSON.stringify(astJson, null, 2));
		} catch (e) {
			console.error("e:", e);
			throw new Error("astJson 解析失败");
		}
	}, [astJson]);

	return <div id="astViewer"></div>;
}
