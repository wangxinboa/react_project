import { isIdentifierAst } from "./ast_types.js";

export function getIdentifierName(identifier) {
	return identifier.name;
}

export function getClassExpressionName(classExpression) {
	if (isIdentifierAst(classExpression.id)) {
		return classExpression.id.name;
	} else {
		throw new Error(
			"执行 getClassExpressionName, 根据 classExpression 获取 class 类名, 存在 classExpression 的 id 属性不是 Identifier 的情况"
		);
	}
}

export function getStringLiteralValue(stringLiteral) {
	return stringLiteral.value;
}

export function getNumericLiteralValue(numericLiteral) {
	return numericLiteral.value;
}

export function getBooleanLiteralValue(booleanLiteral) {
	return booleanLiteral.value;
}

/** 获取 ast 节点的类型 */
export function getAstType(ast) {
	return ast.type;
}
