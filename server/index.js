const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;

const app = express();
app.use(cors());
app.use(express.json());

// ==================== 文件树相关 ====================
function sortFilesAndFolders(a, b) {
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
	if (a.isFolder && !b.isFolder) return -1;
	if (!a.isFolder && b.isFolder) return 1;
	return collator.compare(a.title, b.title);
}

async function buildFileTree(dirPath, excludeDirs) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true });
	const children = [];
	for (let i = 0; i < entries.length; i++) {
		const entry = entries[i];
		if (entry.name.startsWith(".")) continue;
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			if (excludeDirs.includes(entry.name)) continue;
			const subChildren = await buildFileTree(fullPath, excludeDirs);
			children.push({ key: fullPath, title: entry.name, isFolder: true, selectable: false, children: subChildren });
		} else if (entry.isFile()) {
			let codeString = "";
			try {
				codeString = await fs.readFile(fullPath, "utf-8");
			} catch (e) {}
			const suffix = path.extname(entry.name).toLowerCase();
			children.push({ key: fullPath, title: entry.name, suffix, isLeaf: true, selectable: true, codeString });
		}
	}
	children.sort(sortFilesAndFolders);
	return children;
}

app.get("/api/file-tree", async (req, res) => {
	try {
		const { rootPath, exclude } = req.query;
		if (!rootPath) return res.status(400).json({ error: "rootPath is required" });
		const absoluteRoot = path.resolve(rootPath);
		await fs.access(absoluteRoot);
		const excludeList = exclude
			? exclude
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean)
			: [];
		const children = await buildFileTree(absoluteRoot, excludeList);
		const rootNode = {
			key: absoluteRoot,
			title: path.basename(absoluteRoot) || absoluteRoot,
			isFolder: true,
			selectable: false,
			children,
		};
		res.json({ success: true, data: rootNode });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

// ==================== 提示词配置管理 ====================
const DATA_FILE = path.join(__dirname, "prompts.json");
let promptsData = [];
let nextId = 1;

async function loadPrompts() {
	try {
		const raw = await fs.readFile(DATA_FILE, "utf-8");
		promptsData = JSON.parse(raw);
		// 重新计算最大 ID
		nextId = 1;
		for (let i = 0; i < promptsData.length; i++) {
			if (promptsData[i].id >= nextId) nextId = promptsData[i].id + 1;
		}
	} catch (e) {
		promptsData = [];
		nextId = 1;
	}
}

async function savePrompts() {
	await fs.writeFile(DATA_FILE, JSON.stringify(promptsData, null, 2), "utf-8");
}

// 获取所有
app.get("/api/prompts", (req, res) => {
	res.json({ success: true, data: promptsData });
});

// 获取单个
app.get("/api/prompts/:id", (req, res) => {
	const id = parseInt(req.params.id, 10);
	const item = promptsData.find((p) => p.id === id);
	if (!item) return res.status(404).json({ success: false, error: "未找到" });
	res.json({ success: true, data: item });
});

// 新增
app.post("/api/prompts", async (req, res) => {
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
		await savePrompts();
		res.json({ success: true, data: newItem });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

// 更新
app.put("/api/prompts/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const item = promptsData.find((p) => p.id === id);
		if (!item) return res.status(404).json({ success: false, error: "未找到" });
		const { name, components } = req.body;
		if (name !== undefined) item.name = name;
		if (components !== undefined) item.components = components;
		item.updateTime = Date.now();
		await savePrompts();
		res.json({ success: true, data: item });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

// 删除
app.delete("/api/prompts/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const idx = promptsData.findIndex((p) => p.id === id);
		if (idx === -1) return res.status(404).json({ success: false, error: "未找到" });
		promptsData.splice(idx, 1);
		await savePrompts();
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

const PORT = 2998;
loadPrompts().then(() => {
	app.listen(PORT, () => {
		console.log(`服务已启动: http://localhost:${PORT}`);
	});
});
