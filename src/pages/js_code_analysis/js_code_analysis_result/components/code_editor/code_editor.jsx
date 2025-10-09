import { useCallback, useEffect, useRef, useContext } from "react";

import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";
import { setScroll, setRange } from "../../code_files/code_file_code_message.js";

import styles from "./code_editor.module.scss";

const CodeEditor = () => {
	const { selectedCodeFile } = useContext(JsCodeJsCodeAnalysisResultContext);

	const editorRef = useRef({
		suppressSelectionEvents: false,
		editor: null,
	});
	/** 当 CodeEditor 滚动时 */
	const handleOnChangeScroll = useCallback(() => {
		if (selectedCodeFile !== null) {
			const _codeMessage = selectedCodeFile.codeMessage;
			setScroll(
				_codeMessage,
				editorRef.current.editor.session.getScrollTop(),
				editorRef.current.editor.session.getScrollLeft()
			);
		}
	}, [selectedCodeFile]);
	/** 当 CodeEditor 选择的 range 有变化时*/
	const handleOnChangeSelection = useCallback(() => {
		if (selectedCodeFile !== null) {
			const _codeMessage = selectedCodeFile.codeMessage;
			setRange(_codeMessage, editorRef.current.editor.selection.getRange());
		}
	}, [selectedCodeFile]);

	useEffect(() => {
		const _editor = window.ace.edit("codeEditor");

		// 基础配置
		_editor.setTheme("ace/theme/monokai"); // 主题
		_editor.session.setMode("ace/mode/javascript"); // 语言模式
		_editor.setFontSize(14); // 字体大小
		_editor.renderer.setShowPrintMargin(false); // 是否显示打印边距
		// 设置只读模式
		_editor.setReadOnly(true);

		editorRef.current.editor = _editor;
	}, []);

	useEffect(() => {
		const _editor = editorRef.current.editor;

		if (selectedCodeFile === null) {
			// 设置 CodeEditor 信息
			_editor.setValue("");
		} else {
			// 设置 CodeEditor 信息
			editorRef.current.suppressSelectionEvents = true;

			const _codeMessage = selectedCodeFile.codeMessage;
			_editor.setValue(_codeMessage.codeString);
			_editor.session.setScrollTop(_codeMessage.vScroll);
			_editor.session.setScrollLeft(_codeMessage.hScroll);
			_editor.selection.setSelectionRange(_codeMessage.range);

			_editor.focus();

			editorRef.current.suppressSelectionEvents = false;
		}
	}, [selectedCodeFile]);

	useEffect(() => {
		const editor = editorRef.current.editor;

		editor.session.on("changeScrollTop", handleOnChangeScroll);
		editor.session.on("changeScrollLeft", handleOnChangeScroll);
		editor.selection.on("changeSelection", handleOnChangeSelection);

		return () => {
			editor.session.off("changeScrollTop", handleOnChangeScroll);
			editor.session.off("changeScrollLeft", handleOnChangeScroll);
			editor.selection.off("changeSelection", handleOnChangeSelection);
		};
	}, [handleOnChangeScroll, handleOnChangeSelection]);

	return <div id="codeEditor" className={styles.code_editor} />;
};

export default CodeEditor;
