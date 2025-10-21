import getOperationRecordKey from "../js_code_struct_utils/get_operation_record_key.js";

export default class BaseOperationRecord {
	constructor() {
		this.key = getOperationRecordKey();
	}

	destroy() {
		this.key = null;
	}
}
