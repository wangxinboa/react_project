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
		return collator.compare(fileA.name, fileB.name);
	}
}

export default class Folder {
	constructor() {
		this.type = "folder";
		this.isFolder = true;

		this.key = void 0;
		this.name = void 0;

		this.folders = [];
		this.foldersMap = new Map();

		this.files = [];
		this.filesMap = new Map();

		this.parent = null;
		this.children = [];
	}
	init(path, name) {
		this.key = path;
		this.name = name;

		return this;
	}

	setParent(parent) {
		this.parent = parent;
	}

	hasFolder(name) {
		return this.foldersMap.has(name);
	}
	getFolder(name) {
		return this.foldersMap.get(name);
	}
	addFolder(folder) {
		this.folders.push(folder);
		this.foldersMap.set(folder.name, folder);

		folder.setParent(this);
		this.children.push(folder);

		this.sort();

		return this;
	}

	hasFile(name) {
		return this.filesMap.has(name);
	}
	getFile(name) {
		return this.filesMap.get(name);
	}
	addFile(file) {
		this.files.push(file);
		this.filesMap.set(file.name, file);

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
			name: this.name,

			folders: this.folders,
			files: this.files,
			children: this.children,
		};
	}
}
