import React, { useCallback, useEffect, useRef, useImperativeHandle, useState } from "react";

import CodeFile from "../analysis_result_setting/input_files/code_file.js";
import styles from "./code_editor.module.scss";

export default React.forwardRef(function CodeEditor(_, ref) {
	const editorRef = useRef({});

	const [codeFile, setCodeFile] = useState(null);

	const handleChangeScroll = useCallback(() => {
		const editor = editorRef.current.editor;
		CodeFile.setScroll(codeFile, editor.session.getScrollTop(), editor.session.getScrollLeft());
	}, [codeFile]);

	const handleChangeSelection = useCallback(() => {
		CodeFile.setRange(codeFile, editorRef.current.editor.selection.getRange());
	}, [codeFile]);

	useEffect(() => {
		const editor = window.ace.edit("codeEditor");

		// 基础配置
		editor.setTheme("ace/theme/monokai"); // 主题
		editor.session.setMode("ace/mode/javascript"); // 语言模式
		editor.setFontSize(14); // 字体大小
		editor.renderer.setShowPrintMargin(false);

		editorRef.current.editor = editor;
		// 测试用, 待删除
		window.editor = editor;
	}, []);

	useEffect(() => {
		const editor = editorRef.current.editor;

		if (codeFile) {
			editor.setValue(codeFile.code);

			editor.session.setScrollTop(codeFile.vScroll);
			editor.session.setScrollLeft(codeFile.hScroll);

			editor.selection.setSelectionRange(codeFile.range);

			editor.focus();
		}
	}, [codeFile]);

	useEffect(() => {
		const editor = editorRef.current.editor;

		editor.session.on("changeScrollTop", handleChangeScroll);
		editor.session.on("changeScrollLeft", handleChangeScroll);
		editor.selection.on("changeSelection", handleChangeSelection);

		return () => {
			editor.session.off("changeScrollTop", handleChangeScroll);
			editor.session.off("changeScrollLeft", handleChangeScroll);
			editor.selection.off("changeSelection", handleChangeSelection);
		};
	}, [handleChangeScroll, handleChangeSelection]);

	useImperativeHandle(
		ref,
		() => {
			return {
				setCurrentCodeFile(_codeFile) {
					setCodeFile(_codeFile);
				},
			};
		},
		[]
	);

	return <div id="codeEditor" className={styles.code_editor}></div>;
});
