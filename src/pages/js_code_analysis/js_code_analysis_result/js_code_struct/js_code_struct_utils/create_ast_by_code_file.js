import { parse } from "@babel/parser";

export default function createAstByCodeFile(codeFile) {
	try {
		return parse(codeFile.codeMessage.codeString, {
			sourceType: "module",
			strictMode: false,
			createParenthesizedExpressions: false,
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
				// 'exportDefaultBy',
				// 'exportNamespaceBy'
			],
		});
	} catch (e) {
		return null;
	}
}
