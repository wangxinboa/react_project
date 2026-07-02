const path = require("path");

/** 服务端数据存储目录 */
const dataDir = path.join(__dirname, "server_data");
/** AI 提示词数据文件路径 */
const aiPromptDataFile = path.join(dataDir, "ai_prompt_data.json");
/** 项目管理数据文件路径 */
const projectManagerDataFile = path.join(dataDir, "project_manager_data.json");

module.exports = {
	dataDir,
	aiPromptDataFile,
	projectManagerDataFile,
};
