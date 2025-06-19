import { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-searchbox";

// 将 AST 转换为简化格式用于展示
const simplifyAST = (node) => {
	if (!node || typeof node !== "object") return node;

	const result = {};

	// 保留基本属性
	if (node.type) result.type = node.type;
	if (node.name) result.name = node.name;

	// 特殊处理位置信息
	if (node.loc) {
		result.loc = {
			start: {
				line: node.loc.start.line,
				column: node.loc.start.column,
			},
			end: {
				line: node.loc.end.line,
				column: node.loc.end.column,
			},
		};
	}

	// 处理子节点
	for (const key in node) {
		if (key === "type" || key === "loc" || key === "name") continue;

		const value = node[key];
		if (Array.isArray(value)) {
			result[key] = value.map(simplifyAST);
		} else if (value && typeof value === "object") {
			result[key] = simplifyAST(value);
		}
	}

	return result;
};

const ASTViewer = ({ ast, onSelectNode, selectedNode }) => {
	const [astJson, setAstJson] = useState("");
	const editorRef = useRef(null);

	// 将 AST 转换为 JSON
	useEffect(() => {
		if (!ast) {
			setAstJson("");
			return;
		}

		const simplified = simplifyAST(ast);
		setAstJson(JSON.stringify(simplified, null, 2));
	}, [ast]);

	// 高亮选中的节点
	useEffect(() => {
		const editor = editorRef.current?.editor;
		if (!editor || !selectedNode || !astJson) return;

		const searchText = JSON.stringify(simplifyAST(selectedNode));
		const index = astJson.indexOf(searchText);

		if (index !== -1) {
			// 计算行号
			const textBefore = astJson.substring(0, index);
			const line = textBefore.split("\n").length - 1;

			// 滚动到该行
			editor.gotoLine(line + 1, 0, true);
			editor.scrollToLine(line, true);

			// 高亮文本
			const session = editor.getSession();
			session.addMarker(
				new editor.getSelection()
					.constructor(editor, line, 0, line, 1000)
					.getRange(),
				"ace_selection",
				"text",
				true
			);
		}
	}, [selectedNode, astJson]);

	// 处理选择事件
	const handleSelectionChange = () => {
		const editor = editorRef.current?.editor;
		if (!editor) return;

		const selectedText = editor.getSelectedText();

		if (!selectedText.trim()) return;

		try {
			const node = JSON.parse(selectedText);
			if (node && typeof node === "object" && node.type) {
				onSelectNode(node);
			}
		} catch (e) {
			// 忽略解析错误
		}
	};

	return (
		<div className="editor-panel">
			<div className="panel-header">AST Tree</div>
			<AceEditor
				ref={editorRef}
				mode="json"
				theme="monokai"
				name="ast-editor"
				fontSize={14}
				width="100%"
				height="100%"
				readOnly
				showPrintMargin
				value={astJson}
				onSelectionChange={handleSelectionChange}
				editorProps={{ $blockScrolling: true }}
				setOptions={{
					useWorker: false,
					showLineNumbers: true,
					tabSize: 2,
				}}
			/>
		</div>
	);
};

export default ASTViewer;
