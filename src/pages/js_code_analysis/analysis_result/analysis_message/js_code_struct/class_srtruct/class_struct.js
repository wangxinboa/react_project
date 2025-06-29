import BaseStruct from "../base_struct.js";

export default class ClassStruct extends BaseStruct {
	constructor(id, parent) {
		super(id, parent);

		this.type = "Class";

		this.methodsMap = {};
		this.propertyMap = {};
	}

	addMethod() {}

	addProperty() {}
}
