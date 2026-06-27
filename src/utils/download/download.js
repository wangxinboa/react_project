const a = document.createElement("a");
a.style.display = "none";
document.body.appendChild(a);

export function downloadJSON(jsonString, name) {
	const blob = new Blob([jsonString], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	a.href = url;
	a.download = name;
	a.click();

	setTimeout(() => {
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 1000);
}
