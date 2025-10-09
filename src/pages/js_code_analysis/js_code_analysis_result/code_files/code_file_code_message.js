export function createCodeMessage(codeString) {
	return {
		codeString: codeString,

		vScroll: 0,
		hScroll: 0,

		range: {
			start: {
				row: 0,
				column: 0,
			},
			end: {
				row: 0,
				column: 0,
			},
		},
	};
}

export function setScroll(codeMessage, v, h) {
	codeMessage.vScroll = v;
	codeMessage.hScroll = h;
}

export function setRange(codeMessage, range) {
	codeMessage.range.start.row = range.start.row;
	codeMessage.range.start.column = range.start.column;
	codeMessage.range.end.row = range.end.row;
	codeMessage.range.end.column = range.end.column;
}
