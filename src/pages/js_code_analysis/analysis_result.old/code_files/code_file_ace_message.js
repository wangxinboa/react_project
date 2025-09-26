export function createAceMessage(code) {
	return {
		code: code,

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

export function setScroll(aceMessage, v, h) {
	aceMessage.vScroll = v;
	aceMessage.hScroll = h;
}

export function setRange(aceMessage, range) {
	aceMessage.range.start.row = range.start.row;
	aceMessage.range.start.column = range.start.column;
	aceMessage.range.end.row = range.end.row;
	aceMessage.range.end.column = range.end.column;
}
