/**
 * 项目更新接口可更新的字段列表
 */
const projectUpdateFields = ["name", "gitUrl", "o2Url"];

/**
 * 需求更新接口可更新的字段列表
 */
const requirementUpdateFields = [
	"name",
	"projectItems",
	"aoneUrl",
	"prdUrl",
	"designUrl",
	"testUrl",
	"iterationUrl",
	"devTime",
	"testTime",
	"onlineTime",
	"status",
];

module.exports = {
	projectUpdateFields,
	requirementUpdateFields,
};
