import VariableMap from "../base_struct/variable/variable_map.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";
import VariableStruct from "../variable/variable_struct.js";

export default class FunctionExecuteInstance extends VariableMap {
	static type = "FunctionExecuteInstance";

	constructor(functionStruct, environmentStruct) {
		const _baseKey = `${FunctionExecuteInstance.type}_${getStructIndex()}:`;
		super(_baseKey);
		this.initByEnvironmentStruct(environmentStruct);

		this.isFunctionExecuteInstance = true;
		this.type = FunctionExecuteInstance.type;
		this.functionStruct = functionStruct;
		this.returnStruct = undefined;
	}

	destroy() {
		this.functionStruct = null;
		delete this.returnStruct;
	}

	setReturnValue(valueStruct) {
		this.returnStruct = valueStruct;
	}

	getValue() {
		return this.returnStruct;
	}

	/**
	 * @param {import('../base_struct/function_struct/base_function_struct.js').default} functionStruct
	 */
	static createByFunctionStruct(functionStruct, argumentStructs, environmentStruct) {
		const functionExecuteInstance = new FunctionExecuteInstance(functionStruct, environmentStruct);
		// 添加函数内 params, 并且完成 arguments 的传入
		for (let i = 0, len = functionStruct.params.length; i < len; i++) {
			const argumentStruct = argumentStructs[i];
			const paramStruct = functionStruct.params[i];
			const variable = VariableStruct.createByParamStruct(paramStruct, environmentStruct);
			if (paramStruct.isIdentifier()) {
				variable.assignValue(argumentStruct);
			} else {
				console.error(
					"执行 FunctionExecuteInstance.createByFunctionStruct, 根据已经转化好的函数结构 functionStruct",
					functionStruct,
					"已经转化好的参数结构 paramStruct ",
					paramStruct,
					"函数形参 paramStruct",
					paramStruct,
					"函数传入参数 argumentStruct",
					argumentStruct,
					"执行时的变量 variable:",
					variable,
					"将函数传入参数 argumentStruct 赋值给执行时的变量 variable, 但是 paramStruct 是未处理的函数参数类型, 待完善"
				);
				throw new Error("FunctionExecuteInstance 生成中, paramStruct 是未处理的函数参数类型, 待完善");
			}
			functionExecuteInstance.addVariable(variable);
		}

		return functionExecuteInstance;
	}
}
