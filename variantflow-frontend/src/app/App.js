import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import { withTranslation } from "react-i18next";
import { ACCESS_TOKEN, APP_VERSION, LOGIN_URL } from "../Util/constant";
import { useTheme } from "./context/ThemeContext";
import { useSideBar } from "./context/SideBarContext";
import { useHistory } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./user-pages/Login/Login";

const App = () => {
	console.log("APP VERSION", APP_VERSION);
	const { isDarkTheme } = useTheme()
	const { isSideBarOpen } = useSideBar()
	const history = useHistory();
	useEffect(() => {
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (!token) {
			history.push("/login");
		}
	}, []);

	return (
		<>
			{!localStorage.getItem(ACCESS_TOKEN) ? <Switch>
				<Route exact path="/login" component={Login} />
			</Switch> :
				<div className="container-scroller">
					<Sidebar />
					<div className="container-fluid page-body-wrapper">
						<Navbar />
						<div className="main-panel">
							<div className={`content-wrapper ${isSideBarOpen ? "content-wrapper-margin" : "content-wrapper-margin2"} ${isDarkTheme && "content-bg"}`}>
								<AppRoutes />
							</div>
						</div>
					</div>
				</div>}</>
	);
};

export default withTranslation()(withRouter(App));
