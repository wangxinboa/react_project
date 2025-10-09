import ParamStruct from "../../function_struct/param_struct.js";
import {
	isAssignmentPatternAst,
	isBlockStatementAst,
	isIdentifierAst,
	isRestElementAst,
} from "../../js_code_struct_utils/ast_types.js";
import { getFunctionExecuteInstanceClass } from "../../js_code_struct_utils/struct_types.js";
import PropertyMap from "../property/property_map.js";

export default class BaseFunctionStruct extends PropertyMap {
	constructor(baseKey, functionAst, environmentStruct) {
		super(baseKey, environmentStruct);

		this.ast = functionAst;

		this.paramsMap = {};
		this.params = [];

		this.executeInstances = [];

		this.initParamStructs(this.ast.params);
	}
	destroy() {
		super.destroy();

		this.ast = this.paramsMap = this.params = this.executeInstances = null;
	}

	hasParamStruct(paramName) {
		return paramName in this.paramsMap;
	}
	addParamStruct(paramStruct) {
		if (this.hasParamStruct(paramStruct.name)) {
			console.warn("VariableMap:已经存在相同名称的参数了", paramStruct);
		} else {
			this.paramsMap[paramStruct.name] = paramStruct;
			this.params.push(paramStruct);
		}
	}
	/** 通过 ast 添加参数 code struct */
	initParamStructs() {
		const paramAsts = this.ast.params;
		if (Array.isArray(paramAsts)) {
			for (let i = 0, len = paramAsts.length; i < len; i++) {
				const paramAst = paramAsts[i];
				if (isIdentifierAst(paramAst)) {
					const paramStruct = ParamStruct.createByIdentifierAst(paramAst, this.environmentStruct);
					this.addParamStruct(paramStruct);
					this.addChildStruct(paramStruct, "params");
				} else if (isRestElementAst(paramAst)) {
					const paramStruct = ParamStruct.createByRestElementAst(paramAst, this.environmentStruct);
					this.addParamStruct(paramStruct);
					this.addChildStruct(paramStruct, "params");
				} else if (isAssignmentPatternAst(paramAst)) {
					const paramStruct = ParamStruct.createByAssignmentPatternAst(paramAst, this.environmentStruct);
					this.addParamStruct(paramStruct);
					this.addChildStruct(paramStruct, "params");
				} else {
					console.error(
						"base function struct",
						this,
						"执行 _addParamStructsByAsts, 正在通过 param ast",
						paramAst,
						"添加 param strcut 初始化函数参数结构, param ast 是未处理的参数 ast 类型",
						paramAst.type,
						"待完善"
					);
					throw new Error(
						"function struct 执行 _addParamStructsByAsts, 正在通过 param ast 添加 param strcut 初始化函数参数结构, param ast 是未处理的参数 ast 类型, 待完善"
					);
				}
			}
		} else {
			console.error(
				"function struct",
				this,
				"执行 _addParamStructsByAsts, 正在通过 paramAsts",
				paramAsts,
				"添加 param strcut 初始化函数参数结构, 但 paramAsts 属性值不为数组, 数据类型有误"
			);
			throw new Error(
				"function struct 执行 _addParamStructsByAsts, 正在通过 paramAsts 添加 param strcut 初始化函数参数结构, 但 paramAsts 属性值不为数组, 数据类型有误"
			);
		}
	}
	/** 函数执行 */
	execute(argumentStructValues) {
		const functionExecuteInstance = getFunctionExecuteInstanceClass().createByFunctionStruct(
			this,
			argumentStructValues,
			this.environmentStruct
		);

		// 根据 functionAst 进行函数执行
		let functionAstBody = this.ast.body;
		if (isBlockStatementAst(functionAstBody)) {
			functionAstBody = functionAstBody.body;
		}

		functionExecuteInstance.executeByAsts(functionAstBody);

		this.executeInstances.push(functionExecuteInstance);
		this.addChildStruct(functionExecuteInstance, "函数执行");

		return functionExecuteInstance.getValue();
	}
}
