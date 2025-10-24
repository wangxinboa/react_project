import CacheMap from "../../../../../utils/cache_map/cache_map.js";

export default class AstRelationCases {
	constructor() {
		this.casesMap = new CacheMap();
	}
	addCase(key, codeStruct) {
		if (this.casesMap.has(key)) {
			this.casesMap.get(key).push(codeStruct);
		} else {
			this.casesMap.add(key, [codeStruct]);
		}
	}
	getCase(caseKey) {
		return this.casesMap.get(caseKey);
	}
	getCases() {
		return this.casesMap.cacheArray;
	}
	getCaseKeys() {
		return this.casesMap.cacheKeysArray;
	}

	clear() {
		this.casesMap.clear();
	}
}
