import File from "./file.js";
import Folder from "./folder.js";

export default class BaseRootFolder extends Folder {
	constructor() {
		super();

		this.allFiles = [];
	}

	destroy() {
		super.destroy();

		this.allFiles = null;
	}

	registerFile(file) {
		this.allFiles.push(file);
		return this;
	}

	addFileByPath(path, FolderClass = Folder, FileClass = File) {
		const pathSegments = path.split("/");

		let parentFolderNode = this,
			currentPath = "";

		for (let i = 0, pathSegmentsLen = pathSegments.length; i < pathSegmentsLen; i++) {
			const segmentName = pathSegments[i];
			currentPath += segmentName + "/";

			if (i === pathSegmentsLen - 1) {
				//	是文件
				let fileNode = new FileClass().init(path, segmentName);
				parentFolderNode.addFile(fileNode);

				this.registerFile(fileNode);

				return fileNode;
			} else {
				//	是文件夹
				if (parentFolderNode.hasFolder(segmentName)) {
					// 父文件夹内还未存在这个文字的文件夹
					parentFolderNode = parentFolderNode.getFolder(segmentName);
				} else {
					let folderNode = new FolderClass().init(currentPath, segmentName);

					parentFolderNode.addFolder(folderNode);
					parentFolderNode = folderNode;
				}
			}
		}
	}
}
