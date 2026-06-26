const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

/**
 * 默认排序：文件夹在前，文件在后，同类型按名称排序
 * @param {Folder | AppType.File} a
 * @param {Folder | AppType.File} b
 * @returns {number}
 */
function defaultSort(a, b) {
	if (a.isFolder && !b.isFolder) {
		return -1;
	}
	if (!a.isFolder && b.isFolder) {
		return 1;
	}
	return collator.compare(a.title, b.title);
}

/**
 * 文件树节点 - 文件夹
 * @class
 */
export class Folder {
	type = "folder";
	isFolder = true;
	/** @type {string} 文件夹完整路径 */
	key = "";
	/** @type {string} 文件夹名 */
	title = "";
	/** @type {(Folder | AppType.File)[]} */
	children = [];
	/** @type {Object<string, Folder | AppType.File>} */
	childrenMap = {};

	/**
	 * 初始化文件夹
	 * @param {string} key - 文件夹路径
	 * @param {string} title - 文件夹名称
	 * @returns {Folder}
	 */
	init(key, title) {
		this.key = key;
		this.title = title;
		return this;
	}

	/**
	 * 添加子节点（文件或文件夹）
	 * @param {Folder | AppType.File} child
	 * @returns {Folder}
	 */
	addChild(child) {
		this.children.push(child);
		this.childrenMap[child.title] = child;
		this.children.sort(defaultSort);
		return this;
	}

	/**
	 * 根据名称获取子节点
	 * @param {string} title
	 * @returns {Folder | AppType.File | undefined}
	 */
	getChild(title) {
		return this.childrenMap[title];
	}

	/**
	 * 是否存在指定名称的子节点
	 * @param {string} title
	 * @returns {boolean}
	 */
	hasChild(title) {
		return title in this.childrenMap;
	}

	/**
	 * 转为 antd Tree 节点数据（递归）
	 * @returns {{key: string, title: string, selectable: boolean, children: Object[]}}
	 */
	toTreeNode() {
		const node = {
			key: this.key,
			title: this.title,
			selectable: false,
			children: [],
		};
		for (let i = 0; i < this.children.length; i++) {
			node.children.push(this.children[i].toTreeNode());
		}
		return node;
	}

	/** 释放子节点资源 */
	destroy() {
		for (let i = 0; i < this.children.length; i++) {
			this.children[i].destroy();
		}
		this.children = null;
		this.childrenMap = null;
	}
}
