import BaseStruct from "./base_struct.js";

export default class FileStruct extends BaseStruct {
	constructor(baseKey, file, map) {
		super(baseKey, null, map);

		this.isFileStruct = true;
		this.type = FileStruct.type;
		this.file = file;
	}

	toJSON() {
		return {
			type: FileStruct.type,
			children: this.children,
		};
	}

	static type = "File";
	/**
	 * 根据 CodeFile key 返回对应的 FileStruct 的 key
	 * @param string fileKey FileStruct 的 key 值, 即原始文件的 webkitRelativePath
	 * @returns
	 */
	static createBaseKeyFromFile(file) {
		return `${FileStruct.type}:${file.key}`;
	}
	/**
	 * 根据 CodeFile 相关的信息创建返回 codeFileStructsMap 中的 FileStruct
	 * @param string fileKey FileStruct 的 key 值, 即原始文件的 webkitRelativePath
	 * @param {*} codeFileStructsMap
	 * @param {*} codeStructsMap
	 * @returns
	 */
	static createStructFromFile(file, codeStructsMap) {
		return new FileStruct(FileStruct.createBaseKeyFromFile(file), file, codeStructsMap);
	}
}
