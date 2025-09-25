export function createChildStructSelectOption(type) {
	return {
		value: type,
		label: type,
	};
}

export function createStructSelectOption(struct) {
	return {
		label: struct.baseKey,
		value: struct.key,
	};
}

export function createStructClassSelectOption(structClass) {
	return {
		label: structClass.type,
		value: structClass.type,
	};
}
