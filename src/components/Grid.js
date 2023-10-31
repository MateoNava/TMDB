import React from "react";
import Card from "../commons/Card";
import { Link } from "react-router-dom";

const Grid = function ({ movies, type }) {
  if (movies) {
    return (
      <div className="columns is-multiline layout">
        {movies.map((item) => {
          //Defino el type para los casos en que haya movies y tvShows mezclados en el grid
          const targetType =
            type === "multi" && item.media_type === "movie"
              ? "movies"
              : type === "multi" && item.media_type === "tv"
              ? "tvshows"
              : type;
          return (
            <div className="column is-3" key={item.id}>
              <Link to={`/${targetType}/${item.id}`}>
                <Card item={item} />
              </Link>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1>No hay datos</h1>;
  }
};

export default Grid;
