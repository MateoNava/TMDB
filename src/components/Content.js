import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGenres,
  dateSetter,
  scoreSetter,
  actorsSetter,
  directorsSetter,
} from "../utils/utils";
import { authContext } from "../contexts/AuthContext";
import { GrLinkPrevious } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const Content = () => {
  const { type, id } = useParams();

  const [data, setData] = useState({});
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);

  const userContext = useContext(authContext);

  const navigate = useNavigate();

  //Request GET de la informacion de una pelicula específica
  useEffect(() => {
    if (type === "movies") {
      axios
        .request({
          method: "GET",
          url: "https://api.themoviedb.org/3/movie/" + id,
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2FlY2E1NmZkNGJiOTYzNDRlY2Q2MjFiY2Y3NGUyYiIsInN1YiI6IjY0ZWNiMDBiYzNjODkxMDExZGEwMGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPqHm4cNxjZOFznfEKNaofQd6mIfaurqCtu9loSm8VE",
          },
        })
        .then((response) => setData(response.data))
        .catch(function (error) {
          console.error(error);
        });
    } else if (type === "tvshows") {
      axios
        .request({
          method: "GET",
          url: "https://api.themoviedb.org/3/tv/" + id,
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2FlY2E1NmZkNGJiOTYzNDRlY2Q2MjFiY2Y3NGUyYiIsInN1YiI6IjY0ZWNiMDBiYzNjODkxMDExZGEwMGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPqHm4cNxjZOFznfEKNaofQd6mIfaurqCtu9loSm8VE",
          },
        })
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //Request GET para obtener los actores de una pelicula o tv show
  useEffect(() => {
    let urlType = type === "movies" ? "movie" : "tv";

    axios
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/${urlType}/${id}/credits`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2FlY2E1NmZkNGJiOTYzNDRlY2Q2MjFiY2Y3NGUyYiIsInN1YiI6IjY0ZWNiMDBiYzNjODkxMDExZGEwMGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPqHm4cNxjZOFznfEKNaofQd6mIfaurqCtu9loSm8VE",
        },
      })
      .then((response) => response.data)

      .then((data) => {
        setDirectors(data.crew.filter((person) => person.job === "Director"));
        setActors(data.cast);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //Funcion para agregar a la lista de favoritos
  const addToFavorites = (movie) => {
    //Verificar si el usuario esta logueado
    if (!userContext.isAuthenticated)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to be logged in!",
      });
    let isRepeated = false;
    //Pedido get para obtener los favoritos del usuario y evitar que se repitan
    axios
      .get(`/api/favorites/${userContext.user.id}`)
      .then((result) => result.data)
      .then((data) => {
        isRepeated = data.some((favMovies) => favMovies.movieId === movie.id);

        if (isRepeated)
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This movie is already in your favorites list!",
          });

        //POST a los favoritos del usuario
        axios
          .post("/api/favorites", {
            userId: userContext.user.id,
            movieTitle: movie.title ? movie.title : movie.name,
            movieId: movie.id,
            movieImg: movie.poster_path,
            type: movie.title ? "movies" : "tvshows",
          })
          .then((res) => res.data)
          .then(() => window.location.reload())
          .catch((err) => console.log(err));
      });
  };

  return (
    <div className="container">
      <div
        className="notification "
        style={{ backgroundColor: "#D2E3E8", margin: "10px", color: "black" }}
      >
        <div className="is-flex is-justify-content-space-between">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="button is-ghost"
          >
            <GrLinkPrevious /> Back
          </button>
          <button
            onClick={() => addToFavorites(data)}
            className="button is-success"
          >
            <span className="icon is-small">
              <i className="fas fa-check"></i>
              <FaCheck />
            </span>
            <span>Add to favorites</span>
          </button>
        </div>
        <div className="is-flex is-justify-content-space-between" ></div>
        <div
          className="is-flex is-justify-content-space-between" 
          style={{ marginTop: "3%"}}
          
        >
          <div style={{ maxWidth: "50%" }}>
            <figure className="image">
              <img
                style={{ maxWidth: "90%", margin: "0 auto" }}
                src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                alt="Placeholder"
              />
            </figure>
          </div>
          <div>
            <h1 className="title">
              {type === "movies" ? data.title : data.name}
            </h1>
            <h2 className="subtitle">{data.tagline}</h2>
            <h2 className="subtitle is-6">
              {type === "movies" ? "Movie" : "TV Show"}
            </h2>
            <h3 className="subtitle">
              {type === "movies"
                ? data.release_date && dateSetter(data.release_date)
                : data.first_air_date && dateSetter(data.first_air_date)}
            </h3>
            <div style={{ textAlign: "center" }}>
              <p>
                -----------------------------------------------------------------------------------------------------
              </p>
            </div>
            <br></br>

            <div className="content" style={{ fontFamily: "" }}>
              <h3 className="subtitle">OVERVIEW</h3>
              <p> {data.overview}</p>
              <h3 className="subtitle">CAST</h3>
              <p> {actors[0] && actorsSetter(actors)}</p>
              {type === "movies" ? (
                <div>
                  <h3 className="subtitle">DIRECTOR(S)</h3>
                  <p> {directors[0] && directorsSetter(directors)}</p>{" "}
                </div>
              ) : (
                <div>
                  <h3 className="subtitle">N° OF SEASONS</h3>
                  <p> {data.seasons && data.seasons.length}</p>{" "}
                </div>
              )}

              <h3 className="subtitle">GENRES</h3>
              <p> {getGenres(data.genres)}</p>
              <h3 className="subtitle">SCORE</h3>
              <p> {scoreSetter(data.vote_average)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
