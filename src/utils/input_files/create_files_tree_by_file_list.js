import RootFolder from "./root_folder.js";
import Folder from "./folder.js";
import File from "./file.js";

export default function createFilesTreeByFileList(
	files,
	RootFolderClass = RootFolder,
	FolderClass = Folder,
	FileClass = File
) {
	// 将 files 信息转化为 tree
	let root = new RootFolderClass();

	for (let i = 0, filesLen = files.length; i < filesLen; i++) {
		let file = files[i],
			pathSegments = file.webkitRelativePath.split("/"),
			parentFolderNode,
			currentPath = "";

		for (let j = 0, pathSegmentsLen = pathSegments.length; j < pathSegmentsLen; j++) {
			const segmentName = pathSegments[j];

			currentPath += segmentName + "/";
			if (j === pathSegmentsLen - 1) {
				//	是文件
				let fileNode = new FileClass().initFile(file);
				parentFolderNode.addFile(fileNode);

				root.registerFile(fileNode);
			} else {
				//	是文件夹
				if (j === 0) {
					//	是上传的根文件夹
					if (root.key === void 0) {
						root.init(currentPath, segmentName);
					}
					parentFolderNode = root;
				} else {
					//	是非根文件夹
					if (parentFolderNode.hasFolder(segmentName)) {
						// 还未存在
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

	return root;
}
