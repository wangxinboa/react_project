import { parse } from "@babel/parser";

export function getJsCodeAst(codeStr) {
	try {
		return parse(codeStr, {
			sourceType: "module",
			strictMode: false,
			createParenthesizedExpressions: true,
			allowUndeclaredExports: true,
			plugins: [
				"decimal",
				"decorators-legacy",
				"recordAndTuple",
				"partialApplication",
				"functionBind",
				"doExpressions",
				"moduleBlocks",
				"flow",
				"importAssertions",

				// 'syntaxType'

				// 'classProperties',
				// 'objectRestSpread',
				// 'jsx',
				// 'typescript',
				// 'asyncGenerators',
				// 'dynamicImport',
				// 'exportDefaultFrom',
				// 'exportNamespaceFrom'
			],
		});
	} catch (e) {
		console.error("解析代码失败:", e, codeStr);
		return null;
	}
}

// export function isAstNode(data) {
// 	if (data instanceof Node) {
// 		return true;
// 	} else if (data instanceof Object && typeof data.type === 'string') {
// 		if ((data.type === 'CommentLine' || data.type === 'CommentBlock')) {
// 			return true;
// 		} else {
// 			throw new Error(`isAstNode 函数 ast 节点判断，遇到特殊节点: ${JSON.stringify(data, null, 4)}`);
// 		}
// 	} else {

// 		return false;
// 	}
// }
