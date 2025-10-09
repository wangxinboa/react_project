import ScopeStruct from "./scope_struct.js";

export default class ScopeStructInFile extends ScopeStruct {
	constructor(ast, environmentStruct) {
		super(environmentStruct.codeStructsMap);
		this.initByEnvironmentStruct(environmentStruct);

		this.ast = ast;
	}
	destroy() {
		super.destroy();

		this.ast = null;
	}
}
