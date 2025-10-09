export default class BaseVariableName {
	constructor(name) {
		this.isBaseVariableStruct = true;
		this.name = name;
		this.values = [];
		this.title = name;
	}

	destroy() {
		super.destroy();

		this.isBaseVariableStruct = this.name = this.values = this.title = this.type = null;
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
