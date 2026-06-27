import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from "react-router-dom";
import { Menu } from "antd";
import { PageItems, MenuItems, history } from "./router/router.js";
import styles from "./App.module.scss";
import { useCallback, useState, useEffect } from "react";

/**
 * 根据路径获取菜单选中 key 和需要展开的父级 keys（仅用于初始状态）
 * @param {string} pathname - 当前路径
 * @returns {{ selectedKey: string, openKeys: string[] }}
 */
function getMenuState(pathname) {
	let selectedKey = "";
	const openKeys = [];
	for (let i = 0; i < MenuItems.length; i++) {
		const item = MenuItems[i];
		if (item.children) {
			for (let j = 0; j < item.children.length; j++) {
				if (item.children[j].key === pathname) {
					selectedKey = item.children[j].key;
					openKeys.push(item.key);
					break;
				}
			}
		} else if (item.key === pathname) {
			selectedKey = item.key;
		}
		if (selectedKey) break;
	}
	return { selectedKey, openKeys };
}

function renderRoute(Page) {
	return (
		<Route key={Page.path} path={Page.path} element={Page.Component ? <Page.Component /> : undefined}>
			{Page.children?.map((childPage) => {
				return renderRoute(childPage);
			})}
		</Route>
	);
}

export function App() {
	const initialPath = history.location.pathname;
	const initMenuState = getMenuState(initialPath);
	const [selectedKeys, setSelectedKeys] = useState(initMenuState.selectedKey ? [initMenuState.selectedKey] : []);
	// 初始展开状态根据当前路径设定，后续由用户手动控制
	const [openKeys, setOpenKeys] = useState(initMenuState.openKeys);

	useEffect(() => {
		// 仅监听路由变化更新选中项，不改变展开状态
		const unlisten = history.listen(({ location }) => {
			const { selectedKey } = getMenuState(location.pathname);
			setSelectedKeys(selectedKey ? [selectedKey] : []);
		});
		return unlisten;
	}, []);

	const handleOnClickMenu = useCallback(({ key }) => {
		history.push(key);
	}, []);

	return (
		<div className={styles.app}>
			<div className={styles.menuContainer}>
				<Menu
					mode="inline"
					items={MenuItems}
					selectedKeys={selectedKeys}
					openKeys={openKeys}
					onOpenChange={setOpenKeys}
					onClick={handleOnClickMenu}
				/>
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
