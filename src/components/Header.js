import React from "react";
import "./../styles/Header.css";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../redux/themeSlice";
import { Link } from "react-router-dom";
function Header() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <div>
      <Paper>
        <div className="header-wrapper">
          <Link
            to="/"
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              textDecoration: "none",
            }}
          >
            <strong className="header-strong">Where in the world?</strong>
          </Link>
          <div
            className="header-mode"
            onClick={() => {
              dispatch(changeTheme());
            }}
          >
            {theme === "light" ? (
              <i className="far fa-moon"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
            <p className="header-mode-text">
              Dark mode: {theme === "light" ? "Off" : "On"}
            </p>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Header;
