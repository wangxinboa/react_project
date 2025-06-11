import { useEffect, useRef } from 'react';
import './code_editor.css';

export default function CodeEditor(props) {
	const { onCodeChange = () => { } } = props;
	const editorRef = useRef({});

	useEffect(() => {
		const editor = window.ace.edit('codeEditor');

		// 基础配置
		editor.setTheme('ace/theme/monokai'); // 主题
		editor.session.setMode('ace/mode/javascript'); // 语言模式
		editor.setFontSize(14); // 字体大小

		editorRef.current.editor = editor;
	}, []);

	useEffect(() => {
		// 监听编辑器变化事件
		editorRef.current.editor.session.on('change', onCodeChange);

		return () => {
			editorRef.current.editor.session.off('change', onCodeChange);
		};
	}, [onCodeChange]);

	return (
		<div id="codeEditor"></div>
	);
}