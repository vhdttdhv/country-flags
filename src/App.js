import React from "react";
import Header from "./components/Header";
import "./styles/App.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AppContent from "./components/AppContent";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "./redux/filterSlice";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./Detail";
import { useEffect } from "react";
import { changeTheme } from "./redux/themeSlice";
import { changeSearch } from "./redux/searchSlice";

function App() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.json.value);
  const filter = useSelector((state) => state.filter.value);
  const currentTheme = useSelector((state) => state.theme.value);

  //check if the user have set dark mode before in cookie
  useEffect(() => {
    function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
    const cookieTheme = readCookie("theme");
    //cookieTheme might be null so have to check
    if (cookieTheme && cookieTheme !== currentTheme) dispatch(changeTheme());
    return;
  }, []);

  const regions = [
    { label: "Africa" },
    { label: "Americas" },
    { label: "Asia" },
    { label: "Europe" },
    { label: "Oceania" },
  ];

  // get country names and filter with region
  let countryNames = [];
  countryNames = countries.filter((country) => {
    return country.region === filter || filter === "";
  });
  countryNames = countryNames.map((country) => country.name.common);

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/detail">
            <Detail />
          </Route>

          <Route path="/">
            <div className="app-nav">
              <Autocomplete
                disablePortal
                freeSolo
                options={countryNames}
                size="small"
                className="app-nav-search"
                onChange={(e, value, reason) => {
                  if (reason === "selectOption") dispatch(changeSearch(value));
                  if (reason === "clear") dispatch(changeSearch(""));
                  console.log(reason);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <div className="search-box">
                        <i className="fas fa-search"></i>
                        <span>Search for a country ...</span>
                      </div>
                    }
                  />
                )}
              />

              <Autocomplete
                disablePortal
                options={regions}
                size="small"
                color="common.white"
                className="app-nav-filter"
                onChange={(e, value) => {
                  dispatch(changeFilter(value === null ? "" : value.label));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<span>Filter by Region</span>}
                  />
                )}
              />
            </div>

            <AppContent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
