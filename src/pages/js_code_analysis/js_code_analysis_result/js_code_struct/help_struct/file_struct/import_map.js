import CacheMap from "../../../../../../utils/cache_map/cache_map.js";
import ScopeStruct from "../scope_struct/scope_struct.js";

export default class ImportMap extends ScopeStruct {
	constructor(codeStructsMap) {
		super(codeStructsMap);

		this.importMap = new CacheMap();
		this.importedMap = new CacheMap();
	}
	destroy() {
		super.destroy();

		this.importMap.destroy();
		this.importedMap.destroy();

		this.importMap = this.importedMap = null;
	}
	// importMap
	hasImportFileStruct(importedFileStructKey) {
		return this.importMap.has(importedFileStructKey);
	}
	addImportFileStruct(importFileStruct) {
		const key = importFileStruct.getCodeFileKey();
		if (this.hasImportFileStruct(key)) {
			console.warn("ImportMap.addImportFileStruct:已经存在相同名称的变量", key);
		} else {
			this.importMap.add(key, importFileStruct);
		}
	}
	getImportFileStruct(importedFileStructKey) {
		return this.importMap.get(importedFileStructKey);
	}
	getImportFileStructs() {
		return this.importMap.cacheArray;
	}
	// importedMap
	hasImportedFileStruct(localFileStructKey) {
		return this.importedMap.has(localFileStructKey);
	}
	addImportedFileStruct(importedFileStruct) {
		const key = importedFileStruct.getCodeFileKey();
		if (this.hasImportedFileStruct(key)) {
			console.warn("ImportMap.addImportedFileStruct:已经存在相同名称的变量", key);
		} else {
			this.importedMap.add(importedFileStruct.getCodeFileKey(), importedFileStruct);
		}
	}
	getImportedFileStruct(localFileStructKey) {
		return this.importedMap.get(localFileStructKey);
	}
	getImportedFileStructs() {
		return this.importedMap.cacheArray;
	}

	isRelativePath(path) {
		return path.startsWith("./") || path.startsWith("../");
	}

	getCodeFileBySource(source) {
		let codeFile;
		if (this.isRelativePath(source)) {
			codeFile = this.codeFile.getCodeFileByRelativePath(source);
		} else {
			codeFile = this.codeFile.getCodeFileByPath(this.getImportPackageSourcePath(source));
		}
		if (codeFile === null) {
			console.error(
				"ImportMap 实例",
				this,
				"执行 addImportFileStructBySource 时, 根据传入 import source",
				source,
				"未找到对应的 codeFile, 代码执行逻辑有误"
			);
			throw new Error(
				"ImportMap 实例执行 addImportFileStructBySource 时, 根据传入 import source 未找到对应的 codeFile, 代码执行逻辑有误"
			);
		}

		return codeFile;
	}

	addImportFileStructByCodeFile(codeFile) {
		const importedFileStruct = this.createFileStructByCodeFile(codeFile);
		const importedFileStructKey = importedFileStruct.getCodeFileKey();
		if (!this.hasImportFileStruct(importedFileStructKey)) {
			this.addImportFileStruct(importedFileStruct);

			importedFileStruct.addImportedFileStruct(this);

			return importedFileStruct;
		}

		return this.getImportFileStruct(importedFileStructKey);
	}

	addImportFileStructBySource(source) {
		return this.addImportFileStructByCodeFile(this.getCodeFileBySource(source));
	}
}
