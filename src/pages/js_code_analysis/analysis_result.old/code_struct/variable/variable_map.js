import Variable from "./variable.js";

export default class VariableMap {
	constructor() {
		this.variablesMap = {};
		this.variables = [];
	}

	hasVariable(variables) {
		return variables in this.variablesMap;
	}
	addVariable(variables) {
		if (this.hasVariable(variables)) {
			console.warn("VariableMap:已经存在相同名称的变量");
		} else {
			const variable = new Variable(variables);

			this.variablesMap[variable] = variable;
			this.variables.push(variable);

			return variable;
		}
	}
}
