const collator = new Intl.Collator(undefined, {
	numeric: true, // 开启数字识别
	sensitivity: "base", // 大小写不敏感
});

function defaultFolderSort(fileA, fileB) {
	if (fileA.isFolder && fileB.isFile) {
		return -1;
	} else if (fileA.isFile && fileB.isFolder) {
		return 1;
	} else {
		return collator.compare(fileA.title, fileB.title);
	}
}

export default class Folder {
	constructor() {
		this.type = "folder";
		this.isFolder = true;
		this.key = "";
		this.title = "";
		this.folders = [];
		this.foldersMap = {};
		this.files = [];
		this.filesMap = {};
		this.parent = null;
		this.children = [];
	}

	destroy() {
		for (let i = 0, len = this.children.length; i < len; i++) {
			this.children[i].destroy();
		}
		this.type =
			this.isFolder =
			this.folders =
			this.foldersMap =
			this.files =
			this.filesMap =
			this.parent =
			this.children =
			this.key =
			this.title =
				null;
	}

	init(path, title) {
		this.key = path;
		this.title = title;
		return this;
	}

	setParent(parent) {
		this.parent = parent;
	}

	hasFolder(title) {
		return title in this.foldersMap;
	}

	getFolder(title) {
		return this.foldersMap[title];
	}

	addFolder(folder) {
		this.folders.push(folder);
		this.foldersMap[folder.title] = folder;
		folder.setParent(this);
		this.children.push(folder);
		this.sort();
		return this;
	}

	hasFile(title) {
		return title in this.filesMap;
	}

	getFile(title) {
		return this.filesMap[title];
	}

	addFile(file) {
		this.files.push(file);
		this.filesMap[file.title] = file;
		file.setParent(this);
		this.children.push(file);
		this.sort();
		return this;
	}

	getChildrenLength() {
		return this.folders + this.folders;
	}

	sort(sort) {
		this.children.sort(sort ?? defaultFolderSort);
		return this;
	}

	toJSON() {
		return {
			type: this.type,
			isFolder: true,
			key: this.key,
			title: this.title,
			folders: this.folders,
			files: this.files,
			children: this.children,
		};
	}
}
