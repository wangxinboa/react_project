import Folder from "./folder.js";

export default class RootFolder extends Folder {
	constructor() {
		super();
		this.allFiles = [];

		// readFile
		this._readedFileIndex = 0;
		this._readingFile = null;
		this._fileReader = new FileReader();
		this._fileReader.onload = this.readOnLoad.bind(this);

		this._promiseThen = {};
	}

	saveFile(file) {
		this.allFiles.push(file);
		return this;
	}

	onReadFile() {}

	readOnLoad() {
		this.onReadFile(this._readingFile, this._fileReader.result);
		this.readFileAsText();
	}
	readFileAsText() {
		if (this._readedFileIndex < this.allFiles.length) {
			this._readingFile = this.allFiles[this._readedFileIndex++];
			this._fileReader.readAsText(this._readingFile.file);
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
