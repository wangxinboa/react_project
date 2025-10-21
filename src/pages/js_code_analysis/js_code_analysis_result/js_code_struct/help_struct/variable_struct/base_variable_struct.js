export default class BaseVariableStruct {
	constructor(name, environmentStruct) {
		this.isBaseVariableStruct = true;
		this.name = name;
		this.environmentStruct = environmentStruct;
		this.values = [];
	}

	destroy() {
		super.destroy();

		this.isBaseVariableStruct = this.name = this.environmentStruct = this.values = this.type = null;
	}

	assignValue(struct) {
		this.values.push(struct);
	}
	getVariableValue() {
		const valuesLength = this.values.length;
		if (valuesLength === 0) {
			return;
		}
		return this.values[valuesLength - 1];
	}
}
