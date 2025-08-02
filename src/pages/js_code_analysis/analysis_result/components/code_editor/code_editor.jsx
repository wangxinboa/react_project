import React, { useCallback, useEffect, useImperativeHandle, useRef } from "react";

import styles from "./code_editor.module.scss";

let _editor_ = null;

export default React.forwardRef(function CodeEditor(props, ref) {
	const { onChangeScroll, onChangeSelection } = props;

	const editorRef = useRef({
		suppressSelectionEvents: false,
		editor: null,
	});

	const handleOnChangeScroll = useCallback(() => {
		onChangeScroll?.();
	}, [onChangeScroll]);
	const handleOnChangeSelection = useCallback(() => {
		if (!editorRef.current.suppressSelectionEvents) {
			onChangeSelection?.();
		}
	}, [onChangeSelection]);

	useImperativeHandle(
		ref,
		() => {
			return {
				setData(_value = "", _vScroll = 0, _hScroll = 0, _range = {}) {
					editorRef.current.suppressSelectionEvents = true;
					_editor_ = editorRef.current.editor;

					_editor_.setValue(_value);
					_editor_.session.setScrollTop(_vScroll);
					_editor_.session.setScrollLeft(_hScroll);
					_editor_.selection.setSelectionRange(_range);
					_editor_.focus();

					editorRef.current.suppressSelectionEvents = false;
					_editor_ = null;
				},
				getScrollTop() {
					return editorRef.current.editor.session.getScrollTop();
				},
				getScrollLeft() {
					return editorRef.current.editor.session.getScrollTop();
				},
				getRange() {
					return editorRef.current.editor.selection.getRange();
				},
			};
		},
		[]
	);

	useEffect(() => {
		_editor_ = window.ace.edit("codeEditor");

		// 基础配置
		_editor_.setTheme("ace/theme/monokai"); // 主题
		_editor_.session.setMode("ace/mode/javascript"); // 语言模式
		_editor_.setFontSize(14); // 字体大小
		_editor_.renderer.setShowPrintMargin(false); // 是否显示打印边距

		editorRef.current.editor = _editor_;

		_editor_ = null;

		// todo: 测试用, 待删除
		window._editor_ = _editor_;
	}, []);

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
});
