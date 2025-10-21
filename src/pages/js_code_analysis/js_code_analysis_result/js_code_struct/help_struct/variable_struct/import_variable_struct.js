const ImportVariableStructTypeEnum = {
	default: "default",
	all: "all",
	name: "name",
};

export default class ImportVariableStruct {
	constructor(local, type, fileStruct, imported) {
		this.isImportVariableStruct = true;

		this.name = local;
		this.local = local;
		this.values = null;

		this.fileStruct = fileStruct;

		this.kind = "import";
		this.type = type;

		if (this.kind === ImportVariableStruct.name) {
			this.imported = imported;
		}

		switch (this.type) {
			case ImportVariableStructTypeEnum.default:
				this.title = `import ${this.local} from ${fileStruct.getCodeFileKey()};`;
				break;
			case ImportVariableStructTypeEnum.name:
				if (this.imported && this.local !== this.imported) {
					this.title = `import { ${this.imported} ${
						this.local !== this.imported ? `as ${this.local}` : ""
					} } from ${fileStruct.getCodeFileKey()};`;
				} else {
					this.title = `import { ${this.local} } from ${fileStruct.getCodeFileKey()};`;
				}
				break;
			case ImportVariableStructTypeEnum.all:
				this.title = `import * as ${this.local} from ${fileStruct.getCodeFileKey()};`;
				break;
			default:
				console.error(
					"初始化 ImportVariableStruct 时, this.type",
					this.type,
					"类型不在枚举范围",
					ImportVariableStructTypeEnum,
					"内, 待完善"
				);
				throw new Error("初始化 ImportVariableStruct 时, this.type 类型不在枚举范围内, 待完善");
		}
	}
	destroy() {
		this.isImportVariableStruct =
			this.name =
			this.local =
			this.values =
			this.fileStruct =
			this.kind =
			this.type =
			this.imported =
			this.title =
				null;
	}

	static createKindDefaultByLocalFileStruct(local, fileStruct) {
		return new ImportVariableStruct(local, ImportVariableStructTypeEnum.default, fileStruct);
	}
	static createKindAllByLocalFileStruct(local, fileStruct) {
		return new ImportVariableStruct(local, ImportVariableStructTypeEnum.all, fileStruct);
	}
	static createKindNameByLocalImportedFileStruct(local, imported, fileStruct) {
		return new ImportVariableStruct(local, ImportVariableStructTypeEnum.name, fileStruct, imported);
	}
}
