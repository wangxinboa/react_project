import BaseStruct from "../base_struct.js";
import {
	isImportDeclarationAst,
	isVariableDeclarationAst,
	isVariableDeclaratorAst,
	isExportNamedDeclarationAst,
	isExpressionStatementAst,
	isAssignmentExpressionAst,
	isStringLiteralValueAst,
	isReturnStatementAst,
} from "../../js_code_struct_utils/ast_types.js";
import { getVariableStructClass } from "../../js_code_struct_utils/struct_types.js";
import { getIdentifierName, getStringLiteralValue } from "../../js_code_struct_utils/get_ast_attribute_value.js";
import AssignmentExpressionStruct from "../../binary_operations/assignment_expression_struct/assignment_expression_struct.js";
import ReturnStatementStruct from "../../function_struct/return_statement_struct.js";

export default class VariableMap extends BaseStruct {
	constructor(baseKey) {
		super(baseKey);

		this.isVariableMap = true;

		this.variablesMap = {};
		this.variables = [];
	}

	destroy() {
		super.destroy();

		this.isVariableMap = this.variablesMap = this.variables = null;
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
	// VariableMap
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
	executeByAsts(asts, relation) {
		if (Array.isArray(asts)) {
			for (let i = 0, len = asts.length; i < len; i++) {
				const ast = asts[i];
				if (isVariableDeclarationAst(ast)) {
					this._addVariableByVariableDeclarationAst(ast, relation);
				} else if (isImportDeclarationAst(ast)) {
					// this._addVariableByImportDeclarationAst(ast);
					console.error(
						"variable map",
						this,
						"执行 executeByAsts, 根据 ast",
						ast,
						"执行操作中, 但是 ast 是未处理的 ast 类型",
						ast.type,
						"待完善"
					);
				} else if (isExpressionStatementAst(ast)) {
					const expressionAst = ast.expression;
					if (isStringLiteralValueAst(expressionAst)) {
						const stringValue = getStringLiteralValue(expressionAst);
						if (stringValue === "use strict") {
							console.info("严格模式");
						} else {
							console.error(
								"variable map",
								this,
								"执行 executeByAsts, 根据 ast",
								ast,
								"执行操作中, 未处理当 ast 是 ExpressionStatementAst 类型, ast 的 expression",
								ast.expression,
								"是 StringLiteralValueAst 类型, stringValue",
								stringValue,
								"不为 use strict 的情况, 待完善"
							);
						}
					} else if (isAssignmentExpressionAst(expressionAst)) {
						const expressionAstStruct = AssignmentExpressionStruct.createByAssignmentExpressionAst(expressionAst, this);
						expressionAstStruct.execute();
						this.addChildStruct(expressionAstStruct, relation);
					} else {
						console.error(
							"variable map",
							this,
							"执行 executeByAsts, 根据 ast",
							ast,
							"执行操作中, 当 ast 是 ExpressionStatementAst 类型时, ast 的 expression",
							ast.expression,
							"是未处理的类型",
							ast.expression.type,
							"待完善"
						);
						throw new Error(
							"variable map 执行 executeByAsts, 根据 ast 执行操作中, 当 ast 是 ExpressionStatementAst 类型时, ast 的 expression 是未处理的类型, 待完善"
						);
					}
				} else if (isReturnStatementAst(ast)) {
					if (this.isFunctionExecuteInstance) {
						const returnStatementStruct = ReturnStatementStruct.createByReturnStatementAst(ast, this);
						this.addChildStruct(returnStatementStruct, relation);

						this.setReturnValue(returnStatementStruct.getValue());
					} else {
						console.error(
							"variable map",
							this,
							"执行 executeByAsts, 根据 ast",
							ast,
							"执行操作中, 但是 ast 是 ReturnStatementAst, 但是当前 variable map 不是 isFunctionExecuteInstance, 待完善"
						);
						throw new Error(
							"variable map 执行 executeByAsts, 根据 ast 执行操作中, 但是 ast 是 ReturnStatementAst, 但是当前 variable map 不是 isFunctionExecuteInstance, 待完善"
						);
					}
				} else if (isExportNamedDeclarationAst(ast)) {
					console.error(
						"variable map",
						this,
						"执行 executeByAsts, 根据 ast",
						ast,
						"执行操作中, 但是 ast 是未处理的 ast 类型",
						ast.type,
						"待完善"
					);
				} else {
					console.error(
						"variable map",
						this,
						"执行 executeByAsts, 根据 ast",
						ast,
						"执行操作中, 但是 ast 是未处理的 ast 类型",
						ast.type,
						"待完善"
					);
					// throw new Error("VariableMap 根据 ast 执行操作中, ast 是未处理的 ast 类型, 待完善");
				}
			}
		} else {
			throw new Error("VariableMap 根据 ast 执行操作中, asts 不是数组, 数据类型有误");
		}
		return this;
	}
	/** 根据 variableDeclaration ast 添加变量 */
	_addVariableByVariableDeclarationAst(variableDeclarationAst, relation) {
		const kind = variableDeclarationAst.kind;

		for (let i = 0, len = variableDeclarationAst.declarations.length; i < len; i++) {
			const declaration = variableDeclarationAst.declarations[i];
			if (isVariableDeclaratorAst(declaration)) {
				const variableStruct = getVariableStructClass().createByVariableDeclaratorAst(declaration, kind, this);
				variableStruct.initValueByAst(declaration.init);

				this.addChildStruct(variableStruct, relation);
			} else {
				throw new Error("variableDeclarationAst.declarations 数组内还存在不是 VariableDeclarator 的 ast 元素吗?");
			}
		}
	}
}
