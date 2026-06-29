const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_DIR = path.join(__dirname, "server_data");
const DATA_FILE = path.join(DATA_DIR, "ai_prompt_data.json");

// 确保 server_data 目录存在
try {
	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true });
	}
} catch (e) {
	console.error("创建 server_data 目录失败", e);
}

let promptsData = [];
let nextId = 1;

try {
	const raw = fs.readFileSync(DATA_FILE, "utf-8");
	promptsData = JSON.parse(raw);
	nextId = 1;
	for (let i = 0; i < promptsData.length; i++) {
		if (promptsData[i].id >= nextId) nextId = promptsData[i].id + 1;
	}
} catch (e) {
	promptsData = [];
	nextId = 1;
}

function savePrompts() {
	fs.writeFileSync(DATA_FILE, JSON.stringify(promptsData, null, 2), "utf-8");
}

router.get("/", (req, res) => {
	res.json({ success: true, data: promptsData });
});

router.get("/:id", (req, res) => {
	const id = parseInt(req.params.id, 10);
	const item = promptsData.find((p) => p.id === id);
	if (!item) return res.status(404).json({ success: false, error: "未找到" });
	res.json({ success: true, data: item });
});

router.post("/", (req, res) => {
	try {
		const { name, components } = req.body;
		if (!name) return res.status(400).json({ success: false, error: "名称不能为空" });
		const newItem = {
			id: nextId++,
			name,
			components: components || [],
			createTime: Date.now(),
			updateTime: Date.now(),
		};
		promptsData.push(newItem);
		savePrompts();
		res.json({ success: true, data: newItem });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

router.put("/:id", (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const item = promptsData.find((p) => p.id === id);
		if (!item) return res.status(404).json({ success: false, error: "未找到" });
		const { name, components } = req.body;
		if (name !== undefined) item.name = name;
		if (components !== undefined) item.components = components;
		item.updateTime = Date.now();
		savePrompts();
		res.json({ success: true, data: item });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

router.delete("/:id", (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const idx = promptsData.findIndex((p) => p.id === id);
		if (idx === -1) return res.status(404).json({ success: false, error: "未找到" });
		promptsData.splice(idx, 1);
		savePrompts();
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

module.exports = router;
