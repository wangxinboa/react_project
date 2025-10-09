import BaseStruct from "./base_struct.js";

export default class BaseInEnvironmentStruct extends BaseStruct {
	constructor(baseKey, environmentStruct) {
		super(baseKey);
		this.initByEnvironmentStruct(environmentStruct);
	}
}
