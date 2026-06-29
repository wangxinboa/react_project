function downloadBlob(content, filename, mimeType) {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 1000);
}

export function downloadJSON(jsonString, name) {
	downloadBlob(jsonString, name, "application/json");
}

export function downloadText(text, filename) {
	downloadBlob(text, filename, "text/plain;charset=utf-8");
}
