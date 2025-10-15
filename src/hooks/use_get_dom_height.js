import { useCallback, useRef, useState, useEffect } from "react";

export default function useGetDomHeight() {
	const domRef = useRef(null);

	const [height, setHeight] = useState();

	const setHeightByDom = useCallback(() => {
		if (domRef.current) {
			setHeight(domRef.current.offsetHeight);
		}
	}, []);

	useEffect(() => {
		setHeightByDom();
	}, [setHeightByDom]);

	return {
		domRef,
		setHeightByDom,
		height,
	};
}
