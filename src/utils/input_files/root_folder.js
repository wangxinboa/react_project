import BaseRootFolder from "./base_root_folder.js";

export default class RootFolder extends BaseRootFolder {
	constructor() {
		super();
		// readFile
		this._readedFileIndex = 0;
		this._readingFile = null;
		this._fileReader = new FileReader();
		this._fileReader.onload = this.readOnLoad.bind(this);

		this._promiseThen = {};
	}

	destroy() {
		this._readedFileIndex = this._readingFile = this._fileReader = this._promiseThen = null;

		super.destroy();
	}

	onReadFile() {}

	readOnLoad() {
		this.onReadFile(this._readingFile, this._fileReader.result);
		this.readFileAsText();
	}
	readFileAsText() {
		if (this._readedFileIndex < this.allFiles.length) {
			// 文件还没有读取完
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
