/**
 * 数据库名称
 * @constant {string}
 */
export const DB_NAME = "ProjectManagerDB";

/**
 * 数据库版本
 * @constant {number}
 */
export const DB_VERSION = 1;

/**
 * 对象存储名称
 * @constant {Object}
 */
export const STORES = Object.freeze({
	projects: "projects",
	requirements: "requirements",
});

/**
 * 项目表单字段名称常量
 * @readonly
 * @enum {string}
 */
export const ProjectFormItemNames = Object.freeze({
	name: "name",
	gitUrl: "gitUrl",
	o2Url: "o2Url",
	comment: "comment",
});

/**
 * 项目表单字段标签常量
 * @readonly
 * @enum {string}
 */
export const ProjectFormItemLabels = Object.freeze({
	name: "项目名称",
	gitUrl: "仓库地址",
	o2Url: "o2 地址",
	comment: "注释说明",
});

/**
 * 需求表单字段名称常量
 * @readonly
 * @enum {string}
 */
export const RequirementFormItemNames = Object.freeze({
	name: "name",
	projectIds: "projectIds",
	aoneUrl: "aoneUrl",
	prdUrl: "prdUrl",
	designUrl: "designUrl",
	testUrl: "testUrl",
	crUrl: "crUrl",
	iterationUrl: "iterationUrl",
	devTime: "devTime",
	testTime: "testTime",
	onlineTime: "onlineTime",
	comment: "comment",
	status: "status",
});

/**
 * 需求表单字段标签常量
 * @readonly
 * @enum {string}
 */
export const RequirementFormItemLabels = Object.freeze({
	name: "需求名称",
	projectIds: "关联项目",
	aoneUrl: "Aone 地址",
	prdUrl: "PRD 地址",
	designUrl: "设计稿地址",
	testUrl: "效果测试地址",
	crUrl: "代码 CR 地址",
	iterationUrl: "迭代地址",
	devTime: "开发时间",
	testTime: "提测时间",
	onlineTime: "上线时间",
	comment: "注释说明",
	status: "状态",
});

/**
 * 需求状态枚举
 * @readonly
 * @enum {string}
 */
export const RequirementStatusEnum = Object.freeze({
	pending: "待开发",
	developing: "正在开发",
	debugging: "正在联调",
	testing: "正在测试",
	online: "已上线",
});
