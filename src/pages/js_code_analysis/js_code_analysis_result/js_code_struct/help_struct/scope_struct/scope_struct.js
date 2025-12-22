import OperationRecordStruct from "./operation_record_struct.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";
import CacheMap from "../../../../../../utils/cache_map/cache_map.js";

export default class ScopeStruct extends OperationRecordStruct {
	constructor(codeStructsMessage) {
		super(codeStructsMessage);

		this.isScopeStruct = true;

		this.variablesMap = new CacheMap();
	}

	destroy() {
		super.destroy();

		this.variablesMap.destroy();

		this.isScopeStruct = this.variablesMap = null;
	}

	// Variable
	hasVariable(variableName) {
		return this.variablesMap.has(variableName);
	}
	getVariable(variableName) {
		if (this.hasVariable(variableName)) {
			return this.variablesMap.get(variableName);
		} else if (this.environmentStruct) {
			return this.environmentStruct.getVariable(variableName);
		} else {
			return null;
		}
	}
	getVariables() {
		return this.variablesMap.cacheArray;
	}
	replaceVariable(oldVariableStruct, newVariableStruct) {
		this.removeVariable(oldVariableStruct);
		oldVariableStruct.destroy();
		this.addVariable(newVariableStruct);
	}
	addVariable(variableStruct) {
		if (variableStruct.isBaseVariableStruct || variableStruct.isImportVariableStruct) {
			if (this.hasVariable(variableStruct.name)) {
				console.warn("ScopeStruct.addVariable:已经存在相同名称的变量", variableStruct);
			} else {
				this.variablesMap.add(variableStruct.name, variableStruct);
			}
		} else {
			console.error(
				"variable map",
				this,
				"执行 addVariable, 将传入 variableStruct",
				variableStruct,
				"添加作为变量名, 但是 variableStruct 是未处理的类型, 待完善"
			);
			throw new Error(
				"variable map 执行 addVariable, 将传入 variableStruct 添加作为变量名, 但是 variableStruct 是未处理的类型, 待完善"
			);
		}
	}

	removeVariable(variableStruct) {
		this.variablesMap.remove(variableStruct.name);
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
}
