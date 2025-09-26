import { parse } from "@babel/parser";

export default function createStructFromCodeString(codeString) {
	try {
		const astNode = parse(codeString, {
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
		console.info("astNode:", astNode);
	} catch (e) {
		return null;
	}
}
