import { Folder } from "./folder.js";
import { File } from "./file.js";

/**
 * 根文件夹，用于构建完整文件树并异步读取所有文件内容
 * @class
 * @extends Folder
 */
export class RootFolder extends Folder {
	constructor() {
		super();
		/** @type {File[]} 所有文件的平铺列表 */
		this.allFiles = [];
		/** @type {Object<string, File>} 以完整路径为 key 的文件映射 */
		this.codeFilesMap = {};
		this._readIndex = 0;
		this._reader = new FileReader();
		this._reader.onload = this._onReaderLoad.bind(this);
		/** @type {{resolve: Function, reject: Function}|null} */
		this._promise = null;
	}

	/**
	 * 根据路径添加文件节点（自动创建中间文件夹）
	 * @param {string} path - 文件路径
	 * @param {globalThis.File} browserFile - 浏览器 File 对象
	 * @returns {File}
	 */
	addFileByPath(path, browserFile) {
		const parts = path.split("/");
		let parent = this;
		let currentPath = "";
		for (let i = 0; i < parts.length; i++) {
			const segment = parts[i];
			currentPath += (currentPath ? "/" : "") + segment;
			if (i === parts.length - 1) {
				const fileNode = new File().init(path, segment);
				fileNode.setFile(browserFile);
				parent.addChild(fileNode);
				this.allFiles.push(fileNode);
				return fileNode;
			} else {
				if (parent.hasChild(segment)) {
					parent = parent.getChild(segment);
				} else {
					const folderNode = new Folder().init(currentPath, segment);
					parent.addChild(folderNode);
					parent = folderNode;
				}
			}
		}
	}

	/**
	 * 异步读取所有文件内容为文本，并为每个文件节点设置 codeMessage
	 * @returns {Promise<RootFolder>}
	 */
	readFilesAsText() {
		return new Promise((resolve, reject) => {
			this._promise = { resolve, reject };
			this._readIndex = 0;
			this._readNext();
		});
	}

	/** @private */
	_readNext() {
		if (this._readIndex < this.allFiles.length) {
			this._reader.readAsText(this.allFiles[this._readIndex++].file);
		} else {
			this._promise.resolve(this);
			this._promise = null;
		}
	}

	/** @private */
	_onReaderLoad() {
		const fileNode = this.allFiles[this._readIndex - 1];
		fileNode.codeMessage = { codeString: this._reader.result };
		this.codeFilesMap[fileNode.key] = fileNode;
		this._readNext();
	}

	/**
	 * 获取 antd Tree 所需的树形数据
	 * @returns {Object[]}
	 */
	getTreeData() {
		const result = [];
		for (let i = 0; i < this.children.length; i++) {
			result.push(this.children[i].toTreeNode());
		}
		return result;
	}

	destroy() {
		if (this._reader) {
			this._reader.abort();
		}
		this._reader = null;
		this._promise = null;
		this.allFiles = null;
		this.codeFilesMap = null;
		super.destroy();
	}
}
