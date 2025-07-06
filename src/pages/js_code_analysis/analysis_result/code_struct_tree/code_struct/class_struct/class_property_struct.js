import BaseStruct from "../base_struct.js";

export default class ClassPropertyStruct extends BaseStruct {
	constructor(key, classStruct, isStatic = false) {
		super(key, classStruct);

		this.type = "ClassProperty";
		this.static = isStatic;
	}
}
