export const VariableTypes = {
	unknow: "unknow",
	const: "const",
	var: "var",
	let: "let",
	function: "function",
	class: "class",
	object: "object",
};

export default class Variable {
	constructor(name) {
		this.name = name;
		this.values = [];
		this.isAssignedOnce = true;

		this.type = VariableTypes.unknow;
	}
}
