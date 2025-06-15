import Folder from './folder.js';


export default class RootFolder extends Folder {
	constructor() {
		super();
		this.allFiles = [];

		this._readedFileIndex = 0;

		this._readingFile = null;
		this.fileReader = new FileReader(); // 没有参数
		this.fileReader.onload = this.readOnLoad.bind(this);
	}

	saveFile(file) {

		this.allFiles.push(file);

		return this;
	}

	readOnLoad() {
		this._readingFile.readResult = this.fileReader.result;
		this.readFilesAsText();
	}
	readFilesAsText() {
		if (this._readedFileIndex < this.allFiles.length) {
			this._readingFile = this.allFiles[this._readedFileIndex++];
			if (this._readingFile.hasReadResult()) {
				this.readFilesAsText();
			} else {
				this.fileReader.readAsText(this._readingFile.file);
			}
		} else {
			this._readingFile = null;
		}
	}
}