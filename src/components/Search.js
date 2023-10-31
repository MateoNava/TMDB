import React, { useState } from "react";
import axios from "axios";
import Grid from "./Grid";

const Search = function () {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");

  

  const onChange = (event) => {
    setInputValue(event.target.value);
  };


  //Funcion para obtener las peliculas y series que coincidan con el value del search
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/multi?query=${inputValue}&page=1`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2FlY2E1NmZkNGJiOTYzNDRlY2Q2MjFiY2Y3NGUyYiIsInN1YiI6IjY0ZWNiMDBiYzNjODkxMDExZGEwMGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPqHm4cNxjZOFznfEKNaofQd6mIfaurqCtu9loSm8VE",
        },
      })
      .then(function (response) {
        setSearchedMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  

  return (
    <div style={{ textAlign: "center" }} className="column">
       <h1 className="title">Search for movies or TV shows</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }}>
          <label className="label my-3">
            <input
              onChange={onChange}
              style={{ maxWidth: "50%" }}
              className="input is-rounded "
              type="text"
              placeholder="Search"
            />
          </label>
          <button className="button is-link my-3">Search</button>
        </div>
      </form>
      <Grid movies={searchedMovies} type="multi"/>
    </div>
  );
};

export default Search;
