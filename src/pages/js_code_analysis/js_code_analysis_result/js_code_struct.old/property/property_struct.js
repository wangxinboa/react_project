import BaseVariableStruct from "../base_struct/variable/base_variable_struct.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";

export default class PropertyStruct extends BaseVariableStruct {
	static type = "Property";

	constructor(name, environmentStruct) {
		const _baseKey = `${PropertyStruct.type}_${getStructIndex()}:${name}`;

		super(_baseKey, name, environmentStruct);

		this.type = PropertyStruct.type;
		this.title = name;
	}

	static create(name, environmentStruct) {
		return new PropertyStruct(name, environmentStruct);
	}
}
