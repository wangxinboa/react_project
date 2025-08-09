// 创建隐藏的下载链接元素
const a = document.createElement('a');
a.style.display = 'none';

// 添加到 DOM 并触发点击
document.body.appendChild(a);
a.click();

export default function downloadJSON(jsonString, name) {
	// 创建 Blob 对象 (设置 MIME 类型为 application/json)
	const blob = new Blob([jsonString], { type: 'application/json' });
	// 创建下载链接
	const url = URL.createObjectURL(blob);

	a.href = url;
	a.download = name;

	// 添加到 DOM 并触发点击
	document.body.appendChild(a);
	a.click();

	setTimeout(() => {

		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 1000);
}