import { DatePicker } from "antd";
import dayjs from "dayjs";

/**
 * 基于 antd DatePicker 封装，value 和 onChange 均使用时间戳（毫秒）
 * 其他属性透明传递给 DatePicker
 * @param {Object} props
 * @param {number} [props.value] - 时间戳
 * @param {(timestamp: number) => void} props.onChange - 返回时间戳
 * @returns {JSX.Element}
 */
export function CTimestampDatePicker({ value, onChange, ...restProps }) {
	/**
	 * 时间戳转 dayjs 对象
	 * @param {number} ts
	 * @returns {dayjs.Dayjs|null}
	 */
	const toDayjs = (ts) => (ts ? dayjs(ts) : null);

	/**
	 * 处理日期变化，输出时间戳
	 * @param {dayjs.Dayjs|null} date
	 */
	const handleChange = (date) => {
		if (onChange) {
			onChange(date ? date.valueOf() : undefined);
		}
	};

	return <DatePicker {...restProps} value={toDayjs(value)} onChange={handleChange} />;
}
