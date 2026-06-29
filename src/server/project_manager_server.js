const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_DIR = path.join(__dirname, "server_data");
const DATA_FILE = path.join(DATA_DIR, "project_manager_data.json");

// 确保 server_data 目录存在
try {
	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true });
	}
} catch (e) {
	console.error("创建 server_data 目录失败", e);
}

let data = { projects: [], requirements: [] };
let nextProjectId = 1;
let nextRequirementId = 1;

try {
	const raw = fs.readFileSync(DATA_FILE, "utf-8");
	const parsed = JSON.parse(raw);
	if (parsed && typeof parsed === "object") {
		if (Array.isArray(parsed.projects)) data.projects = parsed.projects;
		if (Array.isArray(parsed.requirements)) data.requirements = parsed.requirements;
	}
} catch (e) {
	data = { projects: [], requirements: [] };
}
for (let i = 0; i < data.projects.length; i++) {
	if (data.projects[i].id >= nextProjectId) nextProjectId = data.projects[i].id + 1;
}
for (let i = 0; i < data.requirements.length; i++) {
	if (data.requirements[i].id >= nextRequirementId) nextRequirementId = data.requirements[i].id + 1;
}

function saveData() {
	fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ==================== 项目接口 ====================
router.get("/projects", (req, res) => {
	res.json({ success: true, data: data.projects });
});

router.post("/projects", (req, res) => {
	try {
		const project = req.body;
		project.id = nextProjectId++;
		project.createTime = project.createTime || Date.now();
		if (!project.requirementIds) project.requirementIds = [];
		data.projects.push(project);
		saveData();
		res.json({ success: true, data: project });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

router.put("/projects/:id", (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const index = data.projects.findIndex((p) => p.id === id);
		if (index === -1) return res.status(404).json({ success: false, error: "项目不存在" });
		const existing = data.projects[index];
		const { name, gitUrl, o2Url } = req.body;
		if (name !== undefined) existing.name = name;
		if (gitUrl !== undefined) existing.gitUrl = gitUrl;
		if (o2Url !== undefined) existing.o2Url = o2Url;
		saveData();
		res.json({ success: true, data: existing });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

router.delete("/projects/:id", (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const index = data.projects.findIndex((p) => p.id === id);
		if (index === -1) return res.status(404).json({ success: false, error: "项目不存在" });
		data.projects.splice(index, 1);
		for (let i = 0; i < data.requirements.length; i++) {
			const req = data.requirements[i];
			if (req.projectIds) {
				const newIds = [];
				for (let j = 0; j < req.projectIds.length; j++) {
					if (req.projectIds[j] !== id) newIds.push(req.projectIds[j]);
				}
				req.projectIds = newIds;
			}
		}
		saveData();
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

// ==================== 需求接口 ====================
router.get("/requirements", (req, res) => {
	res.json({ success: true, data: data.requirements });
});

router.post("/requirements", (req, res) => {
	try {
		const requirement = req.body;
		requirement.id = nextRequirementId++;
		requirement.createTime = requirement.createTime || Date.now();
		if (!requirement.projectIds) requirement.projectIds = [];
		if (!requirement.status) requirement.status = "待开发";
		data.requirements.push(requirement);
		for (let i = 0; i < data.projects.length; i++) {
			const proj = data.projects[i];
			if (requirement.projectIds.indexOf(proj.id) !== -1) {
				if (!proj.requirementIds) proj.requirementIds = [];
				if (proj.requirementIds.indexOf(requirement.id) === -1) {
					proj.requirementIds.push(requirement.id);
				}
			}
		}
		saveData();
		res.json({ success: true, data: requirement });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

router.put("/requirements/:id", (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const index = data.requirements.findIndex((r) => r.id === id);
		if (index === -1) return res.status(404).json({ success: false, error: "需求不存在" });
		const existing = data.requirements[index];
		const oldProjectIds = existing.projectIds || [];
		const {
			name,
			projectIds,
			aoneUrl,
			prdUrl,
			designUrl,
			testUrl,
			crUrl,
			iterationUrl,
			devTime,
			testTime,
			onlineTime,
			status,
		} = req.body;
		if (name !== undefined) existing.name = name;
		if (projectIds !== undefined) existing.projectIds = projectIds;
		if (aoneUrl !== undefined) existing.aoneUrl = aoneUrl;
		if (prdUrl !== undefined) existing.prdUrl = prdUrl;
		if (designUrl !== undefined) existing.designUrl = designUrl;
		if (testUrl !== undefined) existing.testUrl = testUrl;
		if (crUrl !== undefined) existing.crUrl = crUrl;
		if (iterationUrl !== undefined) existing.iterationUrl = iterationUrl;
		if (devTime !== undefined) existing.devTime = devTime;
		if (testTime !== undefined) existing.testTime = testTime;
		if (onlineTime !== undefined) existing.onlineTime = onlineTime;
		if (status !== undefined) existing.status = status;

		for (let i = 0; i < data.projects.length; i++) {
			const proj = data.projects[i];
			if (
				oldProjectIds.indexOf(proj.id) !== -1 &&
				(!existing.projectIds || existing.projectIds.indexOf(proj.id) === -1)
			) {
				if (proj.requirementIds) {
					const newReqIds = [];
					for (let j = 0; j < proj.requirementIds.length; j++) {
						if (proj.requirementIds[j] !== existing.id) newReqIds.push(proj.requirementIds[j]);
					}
					proj.requirementIds = newReqIds;
				}
			}
		}
		if (existing.projectIds) {
			for (let i = 0; i < data.projects.length; i++) {
				const proj = data.projects[i];
				if (existing.projectIds.indexOf(proj.id) !== -1) {
					if (!proj.requirementIds) proj.requirementIds = [];
					if (proj.requirementIds.indexOf(existing.id) === -1) {
						proj.requirementIds.push(existing.id);
					}
				}
			}
		}

		saveData();
		res.json({ success: true, data: existing });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

router.delete("/requirements/:id", (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const index = data.requirements.findIndex((r) => r.id === id);
		if (index === -1) return res.status(404).json({ success: false, error: "需求不存在" });
		data.requirements.splice(index, 1);
		for (let i = 0; i < data.projects.length; i++) {
			const proj = data.projects[i];
			if (proj.requirementIds) {
				const newReqIds = [];
				for (let j = 0; j < proj.requirementIds.length; j++) {
					if (proj.requirementIds[j] !== id) newReqIds.push(proj.requirementIds[j]);
				}
				proj.requirementIds = newReqIds;
			}
		}
		saveData();
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

// ==================== 导入接口 ====================
router.post("/import", (req, res) => {
	try {
		const { projects, requirements } = req.body;
		data.projects = Array.isArray(projects) ? projects : [];
		data.requirements = Array.isArray(requirements) ? requirements : [];
		nextProjectId = 1;
		for (let i = 0; i < data.projects.length; i++) {
			if (data.projects[i].id >= nextProjectId) nextProjectId = data.projects[i].id + 1;
		}
		nextRequirementId = 1;
		for (let i = 0; i < data.requirements.length; i++) {
			if (data.requirements[i].id >= nextRequirementId) nextRequirementId = data.requirements[i].id + 1;
		}
		saveData();
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

module.exports = router;
