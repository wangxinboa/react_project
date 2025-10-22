import ImportMap from "./import_map.js";
import CacheMap from "../../../../../../utils/cache_map/cache_map.js";

export default class ExportMap extends ImportMap {
	constructor(codeStructsMessage) {
		super(codeStructsMessage);

		this.exportDefault = null;
		this.exportMap = new CacheMap();
	}
	hasExport(exportName, exportCodeStruct) {
		return this.exportDefault === exportCodeStruct || this.hasExportInMap(exportName);
	}
	hasExportInMap(exportName) {
		return this.exportMap.has(exportName);
	}

	setExportDefault(codeStruct) {
		if (this.exportDefault !== null) {
			console.error(
				"ExportMap 实例",
				this,
				"执行 addExportDefault, 但是 this.exportDefault",
				this.exportDefault,
				"不为 null, 已经存在, 代码执行逻辑有误"
			);
			throw new Error(
				"ExportMap 实例执行 addExportDefault, 但是 this.exportDefault 不为 null, 已经存在, 代码执行逻辑有误"
			);
		}
		this.exportDefault = codeStruct;
	}

	addExportStruct(exported, exportSpecifierStruct) {
		if (this.hasExportInMap(exported)) {
			console.warn("ExportMap.addExportStruct:已经存在相同名称的变量", exported);
		} else {
			this.exportMap.add(exported, exportSpecifierStruct);
		}
	}
	getExportStructs() {
		return this.exportMap.cacheArray;
	}
	getExportStructNames() {
		return this.exportMap.getKeys();
	}

	destroy() {
		super.destroy();

		this.exportMap.destroy();

		this.exportMap = this.exportDefault = null;
	}
}
