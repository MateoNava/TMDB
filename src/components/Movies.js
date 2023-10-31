import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";

const Movies = function () {
  const [movies, setMovies] = useState([]);

  //Pedido axios de las peliculas populares del dia
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2FlY2E1NmZkNGJiOTYzNDRlY2Q2MjFiY2Y3NGUyYiIsInN1YiI6IjY0ZWNiMDBiYzNjODkxMDExZGEwMGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPqHm4cNxjZOFznfEKNaofQd6mIfaurqCtu9loSm8VE",
        },
      })
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ textAlign: "center" }} className="container is-fluid">
      <div className="notification has-background-grey-lighter">
        <h1 className="title is-size-3">Most Popular Movies Today</h1>
        <Grid movies={movies} type="movies" />
      </div>
    </div>
  );
};

export default Movies;
