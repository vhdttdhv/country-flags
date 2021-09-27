import React from "react";
import "../styles/CountryCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

function CountryCard(props) {
  const item = props.item;
  return (
    <Link to={`/detail/${item.name.common}`} style={{ textDecoration: "none" }}>
      <li className="card-li">
        <Card className="card-wrapper" sx={{ background: `var(--element)` }}>
          <CardMedia
            component="img"
            image={item.flags[1]}
            alt={`flag`}
            className="card-img"
            sx={{
              objectFit: "fill",
            }}
          />
          <CardContent>
            <div className="card-content">
              <div className="card-header">
                <strong>{item.name.common}</strong>
              </div>
              <div className="card-text">
                <p>
                  <strong>Capital: </strong>
                  {item.capital}
                </p>
                <p>
                  <strong>Region: </strong>
                  {item.region}
                </p>
                <p>
                  <strong>Official Name: </strong>
                  {item.name.official}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </li>
    </Link>
  );
}

export default CountryCard;
