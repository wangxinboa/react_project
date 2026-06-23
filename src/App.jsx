import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from "react-router-dom";
import { Menu } from "antd";
import { Pages, PagesItems, history } from "./router/router.js";
import style from "./App.module.scss";

function renderRoute(Page) {
	return (
		<Route key={Page.key} path={Page.path} element={Page.Com ? <Page.Com /> : undefined}>
			{Page.children?.map((childPage) => {
				return renderRoute(childPage);
			})}
		</Route>
	);
}

export default function App() {
	return (
		<div className={style.app}>
			<div className={style.menuContainer}>
				<Menu mode="inline" items={PagesItems} />
			</div>
			<div className={style.content}>
				<HistoryRouter
					history={history}
					future={{
						v7_startTransition: true,
						v7_relativeSplatPath: true,
					}}
				>
					<Routes>
						{Pages.map((Page) => {
							return renderRoute(Page);
						})}
					</Routes>
				</HistoryRouter>
			</div>
		</div>
	);
}
