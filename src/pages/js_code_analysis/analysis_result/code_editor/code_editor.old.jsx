import { useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = ({ code, onChange, onSelectionChange, selectedNode }) => {
	const editorRef = useRef(null);

	// 高亮选中的节点
	useEffect(() => {
		const editor = editorRef.current?.editor;
		if (!editor || !selectedNode?.loc) return;

		const { start, end } = selectedNode.loc;
		const range = {
			start: {
				row: start.line - 1,
				column: start.column,
			},
			end: {
				row: end.line - 1,
				column: end.column,
			},
		};

		// 清除旧的高亮
		const session = editor.getSession();
		session.removeMarker(session.$selectHighlight);

		// 添加新的高亮
		editor.selection.setSelectionRange(range);
		editor.moveCursorTo(range.start.row, range.start.column);
		editor.scrollToRow(range.start.row);

		session.$selectHighlight = session.addMarker(
			range,
			"ace_selection",
			"text",
			true
		);
	}, [selectedNode]);

	// 处理选择变化
	const handleSelectionChange = () => {
		const editor = editorRef.current?.editor;
		if (!editor) return;

		const selection = editor.getSelection();
		const range = selection.getRange();

		// 如果没有选择内容，则返回
		if (
			!range.start.row &&
			!range.end.row &&
			range.start.row === range.end.row &&
			range.start.column === range.end.column
		) {
			return;
		}

		const startPos = {
			line: range.start.row + 1,
			column: range.start.column,
		};
		const endPos = {
			line: range.end.row + 1,
			column: range.end.column,
		};

		onSelectionChange({ start: startPos, end: endPos });
	};

	return (
		<div className="editor-panel">
			<div className="panel-header">JavaScript Code</div>
			<AceEditor
				ref={editorRef}
				mode="javascript"
				theme="monokai"
				name="code-editor"
				fontSize={14}
				width="100%"
				height="100%"
				showPrintMargin
				value={code}
				onChange={onChange}
				onSelectionChange={handleSelectionChange}
				editorProps={{ $blockScrolling: true }}
				setOptions={{
					useWorker: false,
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					showLineNumbers: true,
					tabSize: 2,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
