import CacheMap from "../../../../../utils/cache_map/cache_map.js";
import AstRelation from "./ast_relation.js";

export default class AstRelationManager {
	constructor() {
		this.astRelationsMap = new CacheMap();
	}

	addAstRelation(parentCodeStruct, childCodeStruct, parentRelation) {
		const parentType = parentCodeStruct.type;
		const childType = childCodeStruct.type;

		/** @type {import('./ast_relation.js').default} */
		let parentAstRelation;
		if (this.astRelationsMap.has(parentType)) {
			parentAstRelation = this.astRelationsMap.get(parentType);
		} else {
			parentAstRelation = new AstRelation(parentType);
			this.astRelationsMap.add(parentType, parentAstRelation);
		}
		parentAstRelation.addChildCase(childCodeStruct, parentRelation);

		/** @type {import('./ast_relation.js').default} */
		let childAstRelation;
		if (this.astRelationsMap.has(childType)) {
			childAstRelation = this.astRelationsMap.get(childType);
		} else {
			childAstRelation = new AstRelation(childType);
			this.astRelationsMap.add(childType, childAstRelation);
		}
		childAstRelation.addParentCase(parentCodeStruct, parentRelation);
	}

	getAstRelations() {
		return this.astRelationsMap.cacheArray;
	}

	clear() {
		const astRelations = this.getAstRelations();
		for (let i = 0, len = astRelations.length; i < len; i++) {
			astRelations[i].clear();
		}

		this.astRelationsMap.clear();
	}
}
