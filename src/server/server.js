const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;

const aiPromptRouter = require("./ai_prompt_server");
const projectManagerRouter = require("./project_manager_server");

const app = express();
app.use(cors());
app.use(express.json());

/** 常见图片后缀映射，用于判断文件是否为图片 */
const imageSuffixMap = {
	".png": true,
	".jpg": true,
	".jpeg": true,
	".gif": true,
	".bmp": true,
	".webp": true,
	".svg": true,
	".ico": true,
	".tiff": true,
};

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
			children.push({
				key: fullPath,
				title: entry.name,
				isFolder: true,
				selectable: false,
				children: subChildren,
			});
		} else if (entry.isFile()) {
			const suffix = path.extname(entry.name).toLowerCase();
			const isImage = !!imageSuffixMap[suffix];
			let codeString = "";
			if (isImage) {
				// 图片文件不读取内容，直接返回描述
				const suffixName = suffix.replace(".", "");
				codeString = `${suffixName} 类型图片`;
			} else {
				try {
					codeString = await fs.readFile(fullPath, "utf-8");
				} catch (e) {
					// 读取失败时保持 codeString 为空字符串
				}
			}
			children.push({
				key: fullPath,
				title: entry.name,
				suffix,
				isLeaf: true,
				selectable: true,
				codeString,
				isImage,
			});
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
		console.error(err);
		res.status(500).json({ success: false, error: err.message });
	}
});

app.use("/api/ai_prompt", aiPromptRouter);
app.use("/api/project_manager", projectManagerRouter);

const PORT = 2998;
app.listen(PORT, () => {
	console.log(`服务已启动: http://localhost:${PORT}`);
});
