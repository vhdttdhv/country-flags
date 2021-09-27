import { Paper } from "@mui/material";
import React from "react";
import "./styles/Detail.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DetailTextContent from "./components/DetailTextContent";
import DetailTextButton from "./components/DetailTextButton";
function Detail() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const path = window.location.pathname;
  const country = path.slice(path.lastIndexOf("/") + 1, path.length);
  useEffect(() => {
    fetch(`https://restcountries.com/v3/name/${country}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (items[0] === undefined) return <div></div>;
    else
      return (
        <div className="detail-wrapper">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="detail-back">
              <Paper
                sx={{
                  backgroundColor: "var(--element)",
                  padding: "0.5em 1.5em",
                }}
                size="small"
              >
                <div className="detail-back-content">
                  <i className="fas fa-long-arrow-alt-left"></i>
                  <p>Back</p>
                </div>
              </Paper>
            </div>
          </Link>

          <div className="detail-content">
            <div className="detail-img">
              <img src={items[0].flags[1]} alt="country flag" />
            </div>

            <div className="detail-text">
              <div className="detail-text-header">
                <h2>{items[0].name.official}</h2>
              </div>

              <div className="detail-text-content">
                <DetailTextContent
                  strong="Native Name"
                  text={
                    items[0].altSpellings === undefined
                      ? "None"
                      : items[0].altSpellings[2]
                  }
                />
                <DetailTextContent
                  strong="Subregion"
                  text={
                    items[0].subregion === undefined
                      ? "None"
                      : items[0].subregion
                  }
                />
                <DetailTextContent
                  strong="Capital"
                  text={
                    items[0].capital[0] === undefined ||
                    items[0].capital[0] === ""
                      ? "None"
                      : items[0].capital[0]
                  }
                />
                <DetailTextContent
                  strong="Region"
                  text={
                    items[0].region === undefined ? "None" : items[0].region
                  }
                />
                <DetailTextContent
                  strong="Currency"
                  text={
                    items[0].currencies === undefined
                      ? "None"
                      : Object.keys(items[0].currencies)[0]
                  }
                />
                <DetailTextContent strong="Status" text={items[0].status} />
                <DetailTextContent
                  strong="UN Member"
                  text={items[0].unMember ? "Yes" : "No"}
                />
              </div>

              <div>
                <p className="detail-border-text">
                  <strong>Border contries:</strong>
                </p>
                <ul
                  className="detail-border-button"
                  style={{ listStyleType: "none" }}
                >
                  {items[0].borders === undefined
                    ? "No border countries"
                    : items[0].borders.map((item) => {
                        return (
                          <li key={item}>
                            <DetailTextButton item={item} />
                          </li>
                        );
                      })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
export default Detail;
