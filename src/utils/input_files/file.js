/**
 * 文件树节点 - 文件
 * @class
 */
export class File {
	type = "file";
	isFile = true;
	/** @type {string} 文件完整路径（webkitRelativePath） */
	key = "";
	/** @type {string} 文件名 */
	title = "";
	/** @type {string} 后缀（含点） */
	suffix = "";
	/** @type {globalThis.File|null} 原始浏览器文件对象 */
	file = null;
	/** @type {{codeString: string}|null} 读取后的代码内容 */
	codeMessage = null;

	/**
	 * 初始化节点
	 * @param {string} key - 文件路径
	 * @param {string} title - 文件名
	 * @returns {File}
	 */
	init(key, title) {
		this.key = key;
		this.title = title;
		this.suffix = title.substring(title.lastIndexOf("."));
		return this;
	}
	/**
	 * 设置原始 File 对象
	 * @param {globalThis.File} file
	 */
	setFile(file) {
		this.file = file;
	}
	/**
	 * 转为 antd Tree 节点数据
	 * @returns {{key: string, title: string, isLeaf: boolean, selectable: boolean}}
	 */
	toTreeNode() {
		return {
			key: this.key,
			title: this.title,
			isLeaf: true,
			selectable: true,
		};
	}
	/** 释放资源 */
	destroy() {
		this.file = null;
		this.codeMessage = null;
	}
}
