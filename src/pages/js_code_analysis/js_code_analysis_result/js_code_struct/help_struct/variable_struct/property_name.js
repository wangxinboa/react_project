import BaseVariableName from "./base_variable_name.js";

export default class PropertyName extends BaseVariableName {
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
