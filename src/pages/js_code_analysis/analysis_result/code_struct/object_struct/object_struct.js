import BaseStruct from "../base_struct.js";

export default class ObjectStruct extends BaseStruct {
	constructor(parent, options, map) {
		super(options.name, parent, map);
	}
}
