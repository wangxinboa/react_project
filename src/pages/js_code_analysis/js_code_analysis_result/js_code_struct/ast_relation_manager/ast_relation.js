import CacheMap from "../../../../../utils/cache_map/cache_map.js";

export default class AstRelation {
	constructor(type) {
		this.type = type;
		this.childrenCasesMap = new CacheMap();
		this.parentCasesMap = new CacheMap();
	}

	addChildCase(codeStruct, parentRelation) {
		const type = codeStruct.type;
		const key = `${parentRelation}-${type}`;
		if (this.childrenCasesMap.has(key)) {
			this.childrenCasesMap.get(key).push(codeStruct);
		} else {
			this.childrenCasesMap.add(key, [codeStruct]);
		}
	}
	getChildCase(childCaseKey) {
		return this.childrenCasesMap.get(childCaseKey);
	}
	getChildrenCases() {
		return this.childrenCasesMap.cacheArray;
	}
	getChildrenCaseKeys() {
		return this.childrenCasesMap.cacheKeysArray;
	}

	addParentCase(codeStruct, parentRelation) {
		const type = codeStruct.type;
		const key = `${type}.${parentRelation}`;
		if (this.parentCasesMap.has(key)) {
			this.parentCasesMap.get(key).push(codeStruct);
		} else {
			this.parentCasesMap.add(key, [codeStruct]);
		}
	}
	getParentCase(parentCaseKey) {
		return this.parentCasesMap.get(parentCaseKey);
	}
	getParentCases() {
		return this.parentCasesMap.cacheArray;
	}
	getParentCaseKeys() {
		return this.parentCasesMap.cacheKeysArray;
	}

	clear() {
		this.parentCasesMap.clear();
		this.childrenCasesMap.clear();
	}
}
