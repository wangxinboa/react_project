import CacheMap from "../../../../../utils/cache_map/cache_map.js";
import AstRelationCases from "./ast_relation_cases.js";

export default class AstRelation {
	constructor(type) {
		this.type = type;
		this.childrenRelationsMap = new CacheMap();
		this.parentRelationsMap = new CacheMap();
	}

	addChildCase(codeStruct, relation) {
		const type = codeStruct.type;

		if (!this.childrenRelationsMap.has(relation)) {
			this.childrenRelationsMap.add(relation, new AstRelationCases());
		}
		this.childrenRelationsMap.get(relation).addCase(type, codeStruct);
	}
	getChildrenRelations() {
		return this.childrenRelationsMap.cacheArray;
	}
	getChildrenRelationKeys() {
		return this.childrenRelationsMap.cacheKeysArray;
	}

	addParentCase(parentCodeStruct, codeStruct, relation) {
		const type = parentCodeStruct.type;

		if (!this.parentRelationsMap.has(type)) {
			this.parentRelationsMap.add(type, new AstRelationCases());
		}
		this.parentRelationsMap.get(type).addCase(relation, codeStruct);
	}
	getParentRelations() {
		return this.parentRelationsMap.cacheArray;
	}
	getParentRelationKeys() {
		return this.parentRelationsMap.cacheKeysArray;
	}

	clear() {
		const childrenRelations = this.getChildrenRelations();
		for (let i = 0, len = childrenRelations.length; i < len; i++) {
			childrenRelations[i].clear();
		}

		const parentRelations = this.getParentRelations();
		for (let i = 0, len = parentRelations.length; i < len; i++) {
			parentRelations[i].clear();
		}

		this.parentRelationsMap.clear();
		this.childrenRelationsMap.clear();
	}
}
