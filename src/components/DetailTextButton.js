import React from "react";
import "../styles/DetailTextButton.css";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
function DetailTextButton(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`https://restcountries.com/v3/alpha/${props.item}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
        <Link
          to={`./${items[0].name.common}`}
          onClick={() => {
            window.location.href = `./${items[0].name.common}`;
          }}
          style={{ textDecoration: "none" }}
        >
          <div>
            <Paper
              sx={{
                backgroundColor: "var(--element)",
                padding: "0.5em 1.5em",
              }}
              size="small"
            >
              <div className="detail-text-button-text">
                {items[0].name.common}
              </div>
            </Paper>
          </div>
        </Link>
      );
  }
}

export default DetailTextButton;
