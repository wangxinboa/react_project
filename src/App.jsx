import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from "react-router-dom";
import Pages, { history } from "./router/router.js";

export default function App() {
	return (
		<HistoryRouter
			history={history}
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<Routes>
				{Pages.map((Page) => {
					return <Route key={Page.Path} path={Page.Path} element={<Page.Component />} />;
				})}
			</Routes>
		</HistoryRouter>
	);
}
