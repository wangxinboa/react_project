import BaseOperationRecord from "../base_operation_record.js";

export default class UnknowOperation extends BaseOperationRecord {
	constructor(childStruct) {
		super();

		this.isUnknowOperation = true;

		this.codeStruct = childStruct;
	}

	destroy() {
		super.destroy();

		this.isUnknowOperation = this.codeStruct = null;
	}
}
