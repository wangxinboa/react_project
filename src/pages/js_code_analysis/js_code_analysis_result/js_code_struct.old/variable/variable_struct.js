import BaseVariableStruct from "../base_struct/variable/base_variable_struct.js";
import {
	isArrowFunctionExpressionAst,
	isCallExpressionAst,
	isClassExpressionAst,
	isIdentifierAst,
	isObjectExpressionAst,
} from "../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../js_code_struct_utils/get_ast_attribute_value.js";
import ClassStruct from "../class_struct/class_struct.js";
import CallExpressionStruct from "../call_expression_struct/call_expression_struct.js";
import ArrowFunctionStruct from "../function_struct/arrow_function_struct.js";
import ObjectStruct from "../property/object_struct.js";

const VariableKindTypes = {
	var: "var",
	let: "let",
	const: "const",
	// 函数参数
	param: "param",
};

export default class VariableStruct extends BaseVariableStruct {
	static type = "Variable";

	constructor(name, kind, environmentStruct) {
		const _baseKey = `${VariableStruct.type}:${name}`;

		super(_baseKey, name, environmentStruct);

		this.type = VariableStruct.type;
		this.title = `${kind} ${name}`;

		this.kind = kind;

		if (!(this.kind in VariableKindTypes)) {
			console.warn("%c未知类型 kind 值", "font-size: 18px", this);
		}
	}

	destroy() {
		super.destroy();

		this.kind = null;
	}

	isConst() {
		return this.kind === VariableKindTypes.const;
	}
	isAssignedOnce() {
		return this.kind === VariableKindTypes.const || this.values.length <= 1;
	}

	/** VariableStruct 根据 ast 初始化变量值 */
	initValueByAst(initAst) {
		if (isIdentifierAst(initAst)) {
			// 将另一个变量赋值
			const variableValue = this.environmentStruct.getVariableValueByIdentifierAst(initAst);
			if (variableValue?.isBaseStruct) {
				this.title = `${this.kind} ${this.name} = ${variableValue.name}`;
				this.assignValue(variableValue);
			} else {
				console.error(
					"variable struct",
					this,
					"执行 initValueByAst 根据 initAst",
					initAst,
					"初始化变量值, initAst 为 IdentifierAst 时, 在当前环境结构 this.environmentStruct",
					this.environmentStruct,
					"获取对应的值 variableValue",
					variableValue,
					"赋值给自身, 但是 variableValue 是未处理的类型, 待完善"
				);
				throw new Error(
					"variable struct 执行 initValueByAst 根据 initAst 初始化变量值, initAst 为 IdentifierAst 时, 在当前环境结构 this.environmentStruct 获取对应的值 variableValue 赋值给自身, 但是 variableValue 是未处理的类型, 待完善"
				);
			}
			this.environmentStruct.addVariable(this);
		} else if (isClassExpressionAst(initAst)) {
			if (this.isConst()) {
				const classStruct = ClassStruct.createByClassAst(initAst, this.environmentStruct);
				if (classStruct.name) {
					this.environmentStruct.addVariable(classStruct);
				}
				classStruct.initClassBody();
				if (this.name !== classStruct.name) {
					// 名称相同, 直接添加 class struct, 不处理 variable struct, 只有不相同的时候才添加 variable struct
					this.environmentStruct.addVariable(this);
				}
			} else {
				console.error(
					"variable struct",
					this,
					"执行 initValueByAst 根据 initAst",
					initAst,
					"初始化变量值, initAst 为 ClassExpressionAst 时, 当前 variable struct kind 属性值",
					this.kind,
					"不为 const, 未处理这种情况, 待完善"
				);
				throw new Error(
					"variable struct 执行 initValueByAst 根据 initAst 初始化变量值, initAst 为 ClassExpressionAst 时, 当前 variable struct kind 属性值不为 const, 未处理这种情况, 待完善"
				);
			}
		} else if (isCallExpressionAst(initAst)) {
			const callExpressionStruct = CallExpressionStruct.createByCallExpressionAst(initAst, this.environmentStruct);
			this.addChildStruct(callExpressionStruct, "init");

			const callExpressionStructValue = callExpressionStruct.getValue();
			this.assignValue(callExpressionStructValue);

			this.environmentStruct.addVariable(this);
		} else if (isArrowFunctionExpressionAst(initAst)) {
			const arrowFunctionStruct = ArrowFunctionStruct.createByArrowFunctionAst(initAst, this.environmentStruct);
			this.addChildStruct(arrowFunctionStruct, "init");

			this.assignValue(arrowFunctionStruct);
			this.environmentStruct.addVariable(this);
		} else if (isObjectExpressionAst(initAst)) {
			const objectStruct = ObjectStruct.createByObjectExpressionAst(initAst, this.environmentStruct);
			this.addChildStruct(objectStruct, "init");

			this.assignValue(objectStruct);
			this.environmentStruct.addVariable(this);
		} else {
			console.error(
				`VariableStruct 根据 ast 初始化变量值, initAst 是未处理的 ast 类型 ${initAst.type}, 待完善`,
				initAst
			);
			console.error(
				"variable struct",
				this,
				"执行 initValueByAst 根据 initAst",
				initAst,
				"initAst 是未处理的 ast 类型",
				initAst.type,
				"待完善"
			);
		}

		return this;
	}

	static createByVariableDeclaratorAst(variableDeclaratorAst, kind, environmentStruct) {
		const name = getIdentifierName(variableDeclaratorAst.id);
		return new VariableStruct(name, kind, environmentStruct);
	}

	static createByParamStruct(paramStruct, environmentStruct) {
		return new VariableStruct(paramStruct.name, VariableKindTypes.param, environmentStruct);
	}
}
