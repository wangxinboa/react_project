import Folder from "./folder.js";

export default class RootFolder extends Folder {
	constructor() {
		super();
		this.allFiles = [];

		this._readedFileIndex = 0;

		this._readingFile = null;
		this.fileReader = new FileReader();
		this.fileReader.onload = this.readOnLoad.bind(this);

		this._promiseThen = {};
	}

	onReadFile() {}

	saveFile(file) {
		this.allFiles.push(file);
		return this;
	}

	readOnLoad() {
		this.onReadFile(this._readingFile, this.fileReader.result);
		this._readingFile.readed();
		this.readFileAsText();
	}
	readFileAsText() {
		if (this._readedFileIndex < this.allFiles.length) {
			this._readingFile = this.allFiles[this._readedFileIndex++];
			if (this._readingFile.hasReadResult()) {
				this.readFileAsText();
			} else {
				this.fileReader.readAsText(this._readingFile.file);
			}
		} else {
			this._readingFile = null;
			this._promiseThen.resolve(this);
			this._promiseThen = null;
		}
	}

	readFilesAsText() {
		return new Promise((resolve, reject) => {
			this._promiseThen.resolve = resolve;
			this._promiseThen.reject = reject;

			this.readFileAsText();
		});
	}
}
