import BaseStruct from "../base_struct.js";

export default class ObjectStruct extends BaseStruct {
	constructor(parent, option, map) {
		super(option.name, parent, map);
	}
}
