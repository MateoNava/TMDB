import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import Grid from "./components/Grid";
import Content from "./components/Content";
import Search from "./components/Search";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import AuthContextProvider from "./contexts/AuthContext";
import UserList from "./components/UserList";
import UserInfo from "./commons/UserInfo";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";

const App = () => {
  const [movies, setMovies] = useState([]);

  //Pedido axios para obtener las movies y tvshow 
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/all/week",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2FlY2E1NmZkNGJiOTYzNDRlY2Q2MjFiY2Y3NGUyYiIsInN1YiI6IjY0ZWNiMDBiYzNjODkxMDExZGEwMGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPqHm4cNxjZOFznfEKNaofQd6mIfaurqCtu9loSm8VE",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <AuthContextProvider>
      <div className="mainBody">
        <Navbar />
        <div className="container is-fluid columns">
          <Routes>
            <Route
              path="/"
              element={
                <div
                  style={{ textAlign: "center" }}
                  className="container is-fluid"
                >
                  <div className="notification has-background-grey-lighter">
                    <h1 className="title is-size-3">
                      WELCOME TO THE MOVIE DATABASE
                    </h1>
                    <h3 className="subtitle">
                      These are the trending movies and TV shows of the week
                    </h3>
                    <Grid movies={movies} type="multi" />
                  </div>
                </div>
              }
            />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserInfo />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:type/:id" element={<Content />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />

            <Route path="/tvshows" element={<TvShows />} />
          </Routes>
          <Sidebar />
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default App;
