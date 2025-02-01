import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import {
  APP_VERSION,
} from "../../Util/constant";
import ThemeToggelSwitch from "./ThemeToggelSwitch";

class Sidebar extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas fixed-sidebar" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        </div>
        <ul className="nav">
          <li className="nav-item nav-category">
            <span className="nav-link pb-0">
              <Trans>
                Variant Flow
                <span className="nav-link ml-2 py-0">
                  <Trans>[ {APP_VERSION} ] </Trans>
                </span>
              </Trans>
            </span>
          </li>
          <li className="nav-item nav-category">
            <span className={`nav-link pb-0 `}>
              <Trans>Management</Trans>
            </span>
          </li>
          <li
            className={
              this.isPathActive("/products")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/products">
              <span className="menu-icon">
                <i className="mdi mdi-format-list-text"></i>
              </span>
              <span className="menu-title">
                <Trans>Products</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/category")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/category">
              <span className="menu-icon">
                <i className="mdi mdi-collage"></i>
              </span>
              <span className="menu-title">
                <Trans>Category</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/options")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/options">
              <span className="menu-icon">
                <i className="mdi mdi-shape-plus"></i>
              </span>
              <span className="menu-title">
                <Trans>Options</Trans>
              </span>
            </Link>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link pb-0">
              <Trans>Theme Settings</Trans>
            </span>
          </li>
          <li className="nav-item menu-items">
            <div className="nav-link" to="">
              <span className="menu-title">
                <Trans>
                  <ThemeToggelSwitch />{" "}
                </Trans>
              </span>
            </div>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname == path;
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
