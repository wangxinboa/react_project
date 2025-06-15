import { useEffect, useRef } from 'react';
import './code_editor.css';

export default function CodeEditor(props) {
	const { file } = props;
	const editorRef = useRef({});

	useEffect(() => {
		const editor = window.ace.edit('codeEditor');

		// 基础配置
		editor.setTheme('ace/theme/monokai'); // 主题
		editor.session.setMode('ace/mode/javascript'); // 语言模式
		editor.setFontSize(14); // 字体大小
		editor.renderer.setShowPrintMargin(false);

		editorRef.current.editor = editor;
		// 测试用, 待删除
		window.editor = editor;
	}, []);

	useEffect(() => {
		const editor = editorRef.current.editor;

		if (file) {
			editor.setValue(file.readResult);

			editor.session.setScrollTop(file.vScroll ?? 0);
			editor.session.setScrollLeft(file.hScroll ?? 0);

			editor.selection.setSelectionRange(file.range);

			editor.focus();
		}

		return () => {
			if (file) {
				file.setScroll(editor.session.getScrollTop(), editor.session.getScrollLeft());
				file.setRange(editor.selection.getRange());
			}
		};
	}, [file]);

	return (
		<div id="codeEditor"></div>
	);
}