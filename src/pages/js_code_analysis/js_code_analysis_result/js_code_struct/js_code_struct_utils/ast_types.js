const AstTypesEnum = {
	File: "File",
	Identifier: "Identifier",
	VariableDeclaration: "VariableDeclaration",
	VariableDeclarator: "VariableDeclarator",
	ClassExpression: "ClassExpression",
	ClassMethod: "ClassMethod",
	ImportDeclaration: "ImportDeclaration",
	StringLiteral: "StringLiteral",
	CallExpression: "CallExpression",
	LogicalExpression: "LogicalExpression",
	ObjectExpression: "ObjectExpression",
	ObjectProperty: "ObjectProperty",
	ObjectMethod: "ObjectMethod",
	ArrowFunctionExpression: "ArrowFunctionExpression",
	ParenthesizedExpression: "ParenthesizedExpression",
	ExportNamedDeclaration: "ExportNamedDeclaration",
	RestElement: "RestElement",
	BlockStatement: "BlockStatement",
	ExpressionStatement: "ExpressionStatement",
	AssignmentExpression: "AssignmentExpression",
	MemberExpression: "MemberExpression",
	ReturnStatement: "ReturnStatement",
	AssignmentPattern: "AssignmentPattern",
};

export function isFileAst(ast) {
	return ast && ast.type === AstTypesEnum.File;
}
export function isIdentifierAst(ast) {
	return ast && ast.type === AstTypesEnum.Identifier;
}
export function isVariableDeclarationAst(ast) {
	return ast && ast.type === AstTypesEnum.VariableDeclaration;
}
export function isVariableDeclaratorAst(ast) {
	return ast && ast.type === AstTypesEnum.VariableDeclarator;
}
export function isClassExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.ClassExpression;
}
export function isClassMethod(ast) {
	return ast && ast.type === AstTypesEnum.ClassMethod;
}
export function isImportDeclarationAst(ast) {
	return ast && ast.type === AstTypesEnum.ImportDeclaration;
}
export function isStringLiteralAst(ast) {
	return ast && ast.type === AstTypesEnum.StringLiteral;
}
export function isCallExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.CallExpression;
}
export function isLogicalExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.LogicalExpression;
}
export function isObjectExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.ObjectExpression;
}
export function isObjectPropertyAst(ast) {
	return ast && ast.type === AstTypesEnum.ObjectProperty;
}
export function isObjectMethodAst(ast) {
	return ast && ast.type === AstTypesEnum.ObjectMethod;
}
export function isArrowFunctionExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.ArrowFunctionExpression;
}
export function isParenthesizedExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.ParenthesizedExpression;
}
export function isExportNamedDeclarationAst(ast) {
	return ast && ast.type === AstTypesEnum.ExportNamedDeclaration;
}
export function isRestElementAst(ast) {
	return ast && ast.type === AstTypesEnum.RestElement;
}
export function isBlockStatementAst(ast) {
	return ast && ast.type === AstTypesEnum.BlockStatement;
}
export function isExpressionStatementAst(ast) {
	return ast && ast.type === AstTypesEnum.ExpressionStatement;
}
export function isAssignmentExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.AssignmentExpression;
}
export function isMemberExpressionAst(ast) {
	return ast && ast.type === AstTypesEnum.MemberExpression;
}
export function isReturnStatementAst(ast) {
	return ast && ast.type === AstTypesEnum.ReturnStatement;
}
export function isAssignmentPatternAst(ast) {
	return ast && ast.type === AstTypesEnum.AssignmentPattern;
}
