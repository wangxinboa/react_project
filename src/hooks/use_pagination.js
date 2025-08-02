import { useState } from "react";

export default function usePagination(startPage, defaultPageSize) {
	const [page, setPage] = useState(startPage);
	const [pageSize, setPageSize] = useState(defaultPageSize);
	const [total, setTotal] = useState(-1);

	return {
		page,
		setPage,
		pageSize,
		setPageSize,
		total,
		setTotal,
	};
}
