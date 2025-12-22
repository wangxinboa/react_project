import PropertyName from "../variable_struct/property_name.js";

export default class PropertyMap {
	constructor() {
		this.isPropertyMap = true;
		this.propertiesMap = {};
		this.properties = [];
	}

	destroy() {
		super.destroy();

		this.isPropertyMap = this.properties = this.propertiesMap = null;
	}

	hasProperty(propertyName) {
		return propertyName in this.propertiesMap;
	}
	addPropertyByName(propertyName) {
		if (this.hasProperty(propertyName)) {
			console.warn("PropertyMap:已经存在相同名称的属性", propertyName);
		} else {
			const propertyStruct = new PropertyName(propertyName, this.environmentStruct);
			this.propertiesMap[propertyName] = propertyStruct;
			this.properties.push(propertyStruct);

			this.addChildStruct(propertyStruct, "properties");
			return propertyStruct;
		}
	}
	addProperty(struct) {
		if (this.hasProperty(struct.name)) {
			console.warn("PropertyMap:已经存在相同名称的属性", struct);
		} else {
			this.propertiesMap[struct.name] = struct;

			this.addChildStruct(struct);
		}
	}

	getVariableStruct(propertyName) {
		if (!this.hasProperty(propertyName)) {
			this.addPropertyByName(propertyName);
		}
		return this.propertiesMap[propertyName];
	}
}
