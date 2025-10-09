import BaseStruct from "../base_struct/base_struct.js";
// import {
// 	isImportDeclarationAst,
// 	isVariableDeclarationAst,
// 	isVariableDeclaratorAst,
// 	isExportNamedDeclarationAst,
// 	isExpressionStatementAst,
// 	isAssignmentExpressionAst,
// 	isStringLiteralAst,
// 	isReturnStatementAst,
// } from "../../js_code_struct_utils/ast_types.js";
// import { getVariableStructClass } from "../../js_code_struct_utils/struct_types.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";
// import AssignmentExpressionStruct from "../../binary_operations/assignment_expression_struct/assignment_expression_struct.js";
// import ReturnStatementStruct from "../../function_struct/return_statement_struct.js";

export default class ScopeStruct extends BaseStruct {
	constructor(codeStructsMap) {
		super(codeStructsMap);

		this.isScopeStruct = true;

		this.variablesMap = {};
		this.variables = [];
	}

	destroy() {
		super.destroy();

		this.isScopeStruct = this.variablesMap = this.variables = null;
	}

	// Variable
	hasVariable(variableName) {
		return variableName in this.variablesMap;
	}
	getVariable(variableName) {
		if (this.hasVariable(variableName)) {
			return this.variablesMap[variableName];
		} else if (this.environmentStruct) {
			return this.environmentStruct.getVariable(variableName);
		} else {
			return null;
		}
	}
	replaceVariable(oldVariableStruct, newVariableStruct) {
		this.removeVariable(oldVariableStruct);
		oldVariableStruct.destroy();
		this.addVariable(newVariableStruct);
	}
	addVariable(variableStruct) {
		if (!variableStruct.isBaseVariableStruct) {
			console.error(
				"variable map",
				this,
				"执行 addVariable, 将传入 variableStruct",
				variableStruct,
				"添加作为变量名, 但是 variableStruct 不是 BaseVariableStruct 是未处理的类型, 数据类型有误"
			);
			throw new Error(
				"variable map 执行 addVariable, 将传入 variableStruct 添加作为变量名, 但是 variableStruct 不是 BaseVariableStruct 是未处理的类型, 数据类型有误"
			);
		}
		if (this.hasVariable(variableStruct.name)) {
			console.warn("VariableMap:已经存在相同名称的变量", variableStruct);
		} else {
			this.variablesMap[variableStruct.name] = variableStruct;
			this.variables.push(variableStruct);
		}
	}
	removeVariable(variableStruct) {
		const _variableIndex = this.variables.indexOf(variableStruct);
		if (_variableIndex > -1) {
			this.variables.splice(_variableIndex, 1);
		}
		delete this.variablesMap[variableStruct.name];
	}
	// VariableValue
	getVariableValueByIdentifierAst(identifierAst) {
		return this.getVariableValue(getIdentifierName(identifierAst));
	}
	getVariableValue(variableName) {
		const variable = this.getVariable(variableName);
		if (variable?.isBaseVariableStruct) {
			return variable.getVariableValue();
		} else if (variable === null) {
			// 该变量还未声明
			return;
		} else if (variable.isClassStruct) {
			return variable;
		} else {
			console.error(
				"variable map",
				this,
				"执行 getVariableValue, 根据 variableName, 获取 variable",
				variable,
				"但是 variable 是未处理的类型, 待完善"
			);
			throw new Error(
				"variable map 执行 getVariableValue, 根据 variableName, 获取 variable 但是 variable 是未处理的类型, 待完善"
			);
		}
	}
	/** 根据 ast 执行相关操作 */
	executeByAsts(asts, relation) {}
	/** 根据 variableDeclaration ast 添加变量 */
	_addVariableByVariableDeclarationAst(variableDeclarationAst, relation) {}
}
