import getStructIndex from "../js_code_struct_utils/get_struct_index.js";
import createCodeStructByAst from "../js_code_struct_utils/create_code_struct_by_ast.js";
import { isArrowFunctionExpressionAst } from "../js_code_struct_utils/ast_types.js";
import ArrowFunctionStruct from "../function_struct/arrow_function_struct.js";
import BaseInEnvironmentStruct from "../base_struct/base_in_environment_struct.js";

export default class CallExpressionStruct extends BaseInEnvironmentStruct {
	static type = "CallExpression";

	constructor(callExpressionAst, environmentStruct) {
		const _baseKey = `${CallExpressionStruct.type}_${getStructIndex()}:`;

		super(_baseKey, environmentStruct);

		this.type = CallExpressionStruct.type;

		this.ast = callExpressionAst;
		this.argumentStructs = [];
		this.argumentStructValues = [];
		this.calleeStruct = this.returnStruct = null;

		this.initArgumentStructs();
		this.initCalleeStruct();
	}

	destroy() {
		super.destroy();

		this.ast = this.argumentStructs = this.argumentStructValues = this.calleeStruct = this.returnStruct = null;
	}

	initArgumentStructs() {
		// arguments
		const argumentAsts = this.ast.arguments;
		if (Array.isArray(argumentAsts)) {
			for (let i = 0, len = argumentAsts.length; i < len; i++) {
				const argumentStruct = createCodeStructByAst(argumentAsts[i], this.environmentStruct);
				this.argumentStructs.push(argumentStruct);
				this.addChildStruct(argumentStruct, "arguments");

				this.argumentStructValues.push(argumentStruct.getValue());
			}
		} else {
			throw new Error(
				"callExpression struct 执行 initArgumentStructs 根据 argumentAsts 初始化传入参数 argumentStructs, 但是 argumentAsts 属性值不为数组, 数据类型有误"
			);
		}
	}
	initCalleeStruct() {
		// callee
		if (isArrowFunctionExpressionAst(this.ast.callee)) {
			this.calleeStruct = ArrowFunctionStruct.createByArrowFunctionAst(this.ast.callee, this.environmentStruct);

			this.addChildStruct(this.calleeStruct, "callee");
		} else {
			console.error(
				"callExpression struct",
				this,
				"执行 initCalleeStruct 根据 this.callExpressionAst.callee",
				this.ast.callee,
				"初始化传入参数 calleeStruct 和 returnStruct, 但是 this.callExpressionAst.callee 是未处理的 ast 类型",
				this.ast.callee.type,
				"待完善"
			);
			throw new Error(
				"callExpression struct 执行 initCalleeStruct 根据 this.callExpressionAst.callee 初始化传入参数 calleeStruct 和 returnStruct, 但是 this.callExpressionAst.callee 是未处理的 ast 类型, 待完善"
			);
		}
	}

	getValue() {
		return this.calleeStruct.execute(this.argumentStructValues);
	}

	static createByCallExpressionAst(callExpressionAst, environmentStruct) {
		return new CallExpressionStruct(callExpressionAst, environmentStruct);
	}
}
