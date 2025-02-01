import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useSideBar } from "../context/SideBarContext";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Util/constant";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
	const { isDarkTheme } = useTheme();
	const { toggleSideBar } = useSideBar();
	const history = useHistory();
	const toggleOffcanvas = () => {
		document.querySelector(".sidebar-offcanvas").classList.toggle("active");
	};

	const logout = () => {
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);
		history.push("/login");
	};

	return (
		<>
			<nav className="navbar p-0 fixed-top d-flex flex-row">
				<div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
				</div>
				<div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch justify-content-end">
					<button
						className="navbar-toggler align-self-center"
						type="button"
						onClick={() => {
							document.body.classList.toggle("sidebar-icon-only");
							toggleSideBar();
						}}
					>
						<span className="mdi mdi-menu"></span>
					</button>
					<ul className="navbar-nav navbar-nav-right">
						<Dropdown alignRight as="li" className="nav-item">
							<Dropdown.Toggle
								as="a"
								className="nav-link cursor-pointer no-caret"
							>
								<div className="navbar-profile">
									<p className="mb-0 navbar-profile-name">
										<Trans>Admin</Trans>
									</p>
									<i className="mdi mdi-menu-down"></i>
								</div>
							</Dropdown.Toggle>

							<Dropdown.Menu
								className={`navbar-dropdown preview-list navbar-profile-dropdown-menu ${isDarkTheme && "dark-dropdown-menu"
									}`}
							>
								<Dropdown.Divider />
								<Dropdown.Item onClick={logout} className="preview-item">
									<div className="preview-thumbnail">
										<div className="preview-icon bg-dark rounded-circle">
											<i className="mdi mdi-logout text-danger"></i>
										</div>
									</div>
									<div className="preview-item-content">
										<p className="preview-subject mb-1" style={{ color: "#344767" }}>
											<Trans>Log Out</Trans>
										</p>
									</div>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</ul>
					<button
						className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
						type="button"
						onClick={toggleOffcanvas}
					>
						<span className="mdi mdi-format-line-spacing"></span>
					</button>
				</div>
			</nav>
		</>
	);
};

export default Navbar;