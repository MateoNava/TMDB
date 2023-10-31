import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";


const TvShows = function () {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/tv/day?page=1',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2FlY2E1NmZkNGJiOTYzNDRlY2Q2MjFiY2Y3NGUyYiIsInN1YiI6IjY0ZWNiMDBiYzNjODkxMDExZGEwMGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPqHm4cNxjZOFznfEKNaofQd6mIfaurqCtu9loSm8VE'
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        setTvShows(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }} className="container is-fluid">
      <div className="notification has-background-grey-lighter">
        <h1 className="title is-size-3">Most Popular TV Shows Today</h1>
        <Grid movies={tvShows} type={"tvshows"}/>
      </div>
    </div>
  );
};

export default TvShows;