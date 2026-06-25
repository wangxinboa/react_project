import dayjs from "dayjs";

/**
 * 格式化时间戳为日期字符串
 * @param {number} ts - 时间戳（毫秒）
 * @returns {string} 格式化后的日期字符串，如 "2025-03-18"；无值时返回 "-"
 */
export function formatDate(ts) {
	return ts ? dayjs(ts).format("YYYY-MM-DD") : "-";
}
