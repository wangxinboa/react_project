import { useCallback, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';

import ASTViewer from './ast_viewer/ast_viewer.jsx';
import CodeEditor from './code_editor/code_editor.jsx';
import { getJsCodeAst } from './babel_parser.js';

import './code_analysis.css';

export default function JsCodeAnalysis() {

	const [astJson, setAstJson] = useState({});
	const onCodeChange = useCallback(function (_, editor) {
		setAstJson(
			getJsCodeAst(
				editor.getValue()
			)
		);
	}, []);

	return (
		<div id='codeAnalysis'>
			<SplitPane split="vertical" minSize={'50%'}>
				<CodeEditor onCodeChange={onCodeChange} />
				<ASTViewer astJson={astJson} />
			</SplitPane>
		</div>
	);
}