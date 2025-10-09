import ObjectStruct from "../property/object_struct.js";
import UsedVariableStruct from "../variable/used_variable_struct.js";
import LogicalExpressionStruct from "../binary_operations/logical_expression_struct/logical_expression_struct.js";
import MemberExpressionStruct from "../binary_operations/member_expression_struct/member_expression_struct.js";

import { isIdentifierAst, isLogicalExpressionAst, isMemberExpressionAst, isObjectExpressionAst } from "./ast_types.js";

export default function createCodeStructByAst(ast, environmentStruct) {
	if (isIdentifierAst(ast)) {
		return UsedVariableStruct.createByIdentifierAst(ast, environmentStruct);
	} else if (isObjectExpressionAst(ast)) {
		return ObjectStruct.createByObjectExpressionAst(ast, environmentStruct);
	} else if (isLogicalExpressionAst(ast)) {
		return LogicalExpressionStruct.createByLogicalExpressionAst(ast, environmentStruct);
	} else if (isMemberExpressionAst(ast)) {
		return MemberExpressionStruct.createByMemberExpressionAst(ast, environmentStruct);
	} else {
		console.error(
			"执行 createCodeStructByAst, 根据 ast",
			ast,
			"环境结构 environmentStruct",
			environmentStruct,
			"获取 CodeStruct, 但是 ast",
			ast,
			"是未处理的 ast 类型",
			ast.type,
			"待完善"
		);
		throw new Error(
			"执行 createCodeStructByAst, 根据 ast, 环境结构 environmentStruct, 获取 CodeStruct, 但是 ast 是未处理的 ast 类型, 待完善"
		);
	}
}
