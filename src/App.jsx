import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from "react-router-dom";
import { Menu } from "antd";
import { PageItems, MenuItems, history } from "./router/router.js";
import styles from "./App.module.scss";
import { useCallback } from "react";

function renderRoute(Page) {
	return (
		<Route key={Page.path} path={Page.path} element={Page.Component ? <Page.Component /> : undefined}>
			{Page.children?.map((childPage) => {
				return renderRoute(childPage);
			})}
		</Route>
	);
}

export default function App() {
	const handleOnClickMenu = useCallback(({ key }) => {
		history.push(key);
	}, []);

	return (
		<div className={styles.app}>
			<div className={styles.menuContainer}>
				<Menu mode="inline" items={MenuItems} onClick={handleOnClickMenu} />
			</div>
			<div className={styles.content}>
				<HistoryRouter
					history={history}
					future={{
						v7_startTransition: true,
						v7_relativeSplatPath: true,
					}}
				>
					<Routes>
						{PageItems.map((PageItem) => {
							return renderRoute(PageItem);
						})}
					</Routes>
				</HistoryRouter>
			</div>
		</div>
	);
}
