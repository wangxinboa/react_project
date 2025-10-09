import BaseInEnvironmentStruct from "../base_struct/base_in_environment_struct.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";

const PrimitiveTypes = {
	String: 0,
	Number: 1,
	Boolean: 2,
	Null: 3,
	Undefined: 4,
};

export default class PrimitiveStruct extends BaseInEnvironmentStruct {
	static type = "Primitive";

	constructor(value, environmentStruct) {
		const _baseKey = `${PrimitiveStruct.type}_${getStructIndex()}:${value}`;
		super(_baseKey, environmentStruct);

		this.type = PrimitiveStruct.type;
		this.isPrimitive = true;

		this.value = value;
		this.title = value;

		if (typeof value === "string") {
			this.valueType = PrimitiveTypes.String;
		} else if (typeof value === "number") {
			this.valueType = PrimitiveTypes.Number;
		} else if (typeof value === "boolean") {
			this.valueType = PrimitiveTypes.Boolean;
		} else if (value === null) {
			this.valueType = PrimitiveTypes.Null;
		} else if (value === undefined) {
			this.valueType = PrimitiveTypes.Undefined;
		} else {
			throw new Error("创建 PrimitiveStruct 实例时, 遇到的未知类型的值");
		}
	}

	destroy() {
		super.destroy();

		this.value = this.valueType = null;
	}

	getValue() {
		return this.value;
	}

	static createByValue(value, environmentStruct) {
		return new PrimitiveStruct(value, environmentStruct);
	}
}
