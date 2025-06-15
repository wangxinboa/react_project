import File from '../../../../utils/input_files/file.js';

export default class CodeFile extends File {
	constructor(file) {
		super(file);

		this.vScroll = 0;
		this.hScroll = 0;

		this.range = {
			start: {
				row: 0,
				column: 0
			},
			end: {
				row: 0,
				column: 0
			}
		};
	}

	setScroll(v, h) {
		this.vScroll = v;
		this.hScroll = h;
	}
	setRange(range) {
		this.range.start.row = range.start.row;
		this.range.start.column = range.start.column;
		this.range.end.row = range.end.row;
		this.range.end.column = range.end.column;
	}

	toJSON() {
		return {
			type: "file",
			isFile: true,

			name: this.name,
			key: this.key,

			suffix: this.suffix,
			readResult: this.readResult,

			vScroll: this.vScroll,
			hScroll: this.hScroll,

			range: this.range,
		};
	}
}