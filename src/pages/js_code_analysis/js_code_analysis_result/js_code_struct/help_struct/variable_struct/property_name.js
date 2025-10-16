import BaseVariableStruct from "./base_variable_struct.js";

export default class PropertyName extends BaseVariableStruct {
	constructor(name, environmentStruct) {
		super(name, environmentStruct);

		this.type = "Property";

		this.isPropertyName = true;
	}
	destroy() {
		super.destroy();

		this.isPropertyName = null;
	}
}
