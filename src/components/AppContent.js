import React from "react";
import "../styles/AppContent.css";
import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import { useDispatch, useSelector } from "react-redux";
import { addJSON } from "../redux/jsonSlice";

function AppContent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const filter = useSelector((state) => state.filter.value);
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://restcountries.com/v3/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
          // get list of countries then save it to redux
          // it's important that you update redux inside useEffect so that it only updates once
          dispatch(addJSON(result));
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
    return (
      <ul className="app-content-ul">
        {items.map((item) =>
          (item.region === filter || filter === "") &&
          (item.name.common === search || search === "") ? (
            <CountryCard key={item.name.official} item={item} />
          ) : (
            ""
          )
        )}
      </ul>
    );
  }
}
export default AppContent;
