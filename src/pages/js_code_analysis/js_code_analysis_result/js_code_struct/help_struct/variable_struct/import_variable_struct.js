const ImportVariableStructTypesEnum = {
	default: "default",
	normal: "normal",
	namespace: "namespace",
};

export default class ImportVariableStruct {
	constructor(local, type, fileStruct, imported) {
		this.isImportVariableStruct = true;
		/** name 会作为 ScopeStruct 中的 key */
		this.name = local;
		this.local = local;

		this.fileStruct = fileStruct;

		this.type = type;

		if (this.type === ImportVariableStructTypesEnum.normal) {
			this.imported = imported;
		}
		this.isSameNameLocalAndImported = local === imported;
	}
	destroy() {
		this.isImportVariableStruct =
			this.name =
			this.local =
			this.fileStruct =
			this.type =
			this.imported =
			this.isSameNameLocalAndImported =
				null;
	}

	static createNormal(local, imported, fileStruct) {
		return new ImportVariableStruct(local, ImportVariableStructTypesEnum.normal, fileStruct, imported);
	}
	static createDefault(local, fileStruct) {
		return new ImportVariableStruct(local, ImportVariableStructTypesEnum.default, fileStruct);
	}
	static createNamespace(local, fileStruct) {
		return new ImportVariableStruct(local, ImportVariableStructTypesEnum.namespace, fileStruct);
	}
}
