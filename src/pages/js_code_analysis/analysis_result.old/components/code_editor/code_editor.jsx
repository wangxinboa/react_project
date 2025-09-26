import { useCallback, useEffect, useRef, useContext } from "react";

import { AnalysisResultContext } from "../../analysis_result.jsx";
// import CodeFile from "../../code_files/code_file.js";
import { setScroll, setRange } from "../../code_files/code_file_ace_message.js";

import styles from "./code_editor.module.scss";

let _editor_ = null;
let _aceMessage_ = null;

const CodeEditor = () => {
	const { selectedCodeFile } = useContext(AnalysisResultContext);

	const editorRef = useRef({
		suppressSelectionEvents: false,
		editor: null,
	});
	/** 当 CodeEditor 滚动时 */
	const handleOnChangeScroll = useCallback(() => {
		if (selectedCodeFile !== null) {
			_aceMessage_ = selectedCodeFile.aceMessage;
			setScroll(
				_aceMessage_,
				editorRef.current.editor.session.getScrollTop(),
				editorRef.current.editor.session.getScrollLeft()
			);
			_aceMessage_ = null;
		}
	}, [selectedCodeFile]);
	/** 当 CodeEditor 选择的 range 有变化时*/
	const handleOnChangeSelection = useCallback(() => {
		if (selectedCodeFile !== null) {
			_aceMessage_ = selectedCodeFile.aceMessage;
			setRange(_aceMessage_, editorRef.current.editor.selection.getRange());
			_aceMessage_ = null;
		}
	}, [selectedCodeFile]);

	useEffect(() => {
		_editor_ = window.ace.edit("codeEditor");

		// 基础配置
		_editor_.setTheme("ace/theme/monokai"); // 主题
		_editor_.session.setMode("ace/mode/javascript"); // 语言模式
		_editor_.setFontSize(14); // 字体大小
		_editor_.renderer.setShowPrintMargin(false); // 是否显示打印边距
		// 设置只读模式
		_editor_.setReadOnly(true);

		editorRef.current.editor = _editor_;

		_editor_ = null;
	}, []);

	useEffect(() => {
		_editor_ = editorRef.current.editor;

		if (selectedCodeFile === null) {
			// 设置 CodeEditor 信息
			_editor_.setValue("");
		} else {
			// 设置 CodeEditor 信息
			editorRef.current.suppressSelectionEvents = true;

			_aceMessage_ = selectedCodeFile.aceMessage;
			_editor_.setValue(_aceMessage_.code);
			_editor_.session.setScrollTop(_aceMessage_.vScroll);
			_editor_.session.setScrollLeft(_aceMessage_.hScroll);
			_editor_.selection.setSelectionRange(_aceMessage_.range);
			_aceMessage_ = null;

			_editor_.focus();

			editorRef.current.suppressSelectionEvents = false;
		}

		_editor_ = null;
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
