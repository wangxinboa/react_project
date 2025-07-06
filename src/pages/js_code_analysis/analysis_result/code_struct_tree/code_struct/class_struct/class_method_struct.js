import BaseStruct from "../base_struct.js";

export default class ClassMethodStruct extends BaseStruct {
	constructor(key, classStruct, isStatic = false) {
		super(key, classStruct);

		this.type = "ClassMethod";
		this.static = isStatic;
	}
}
