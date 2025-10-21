import BaseVariableStruct from "./base_variable_struct.js";

export const VariableStructKindTypesEnum = {
	var: "var",
	let: "let",
	const: "const",
	// 函数参数
	param: "param",
};

export default class VariableStruct extends BaseVariableStruct {
	static type = "Variable";

	constructor(name, kind, environmentStruct) {
		super(name, environmentStruct);

		this.type = VariableStruct.type;
		this.title = `${kind} ${name}`;

		this.isVariableStruct = true;
		this.kind = kind;

		if (!(this.kind in VariableStructKindTypesEnum)) {
			console.error(
				"初始化 VariableStruct 时, kind",
				kind,
				"类型不在枚举范围",
				VariableStructKindTypesEnum,
				"内, 待完善"
			);
			throw new Error("初始化 VariableStruct 时, kind 类型不在枚举范围内, 待完善");
		}
	}

	destroy() {
		super.destroy();

		this.isVariableStruct = this.kind = null;
	}

	isConst() {
		return this.kind === VariableStructKindTypesEnum.const;
	}
	isAssignedOnce() {
		return this.kind === VariableStructKindTypesEnum.const || this.values.length <= 1;
	}

	/** VariableStruct 根据 ast 初始化变量值 */
	initValueByAst(initAst) {
		return this;
	}
}
