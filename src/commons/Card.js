import React from "react";
import { dateSetter } from "../utils/utils";

const Card = function ({ item }) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={
              item.poster_path
                ? "https://image.tmdb.org/t/p/original/" + item.poster_path
                : "https://image.tmdb.org/t/p/original/vbLxDKfo8fYC8ISKKrJczNbGKLP.jpg"
            }
            alt="Placeholder"
          />
        </figure>
      </div>
      <div className="card-content" style={{ textAlign: "left" }}>
        <div className="media">
          <div className="media-left" style={{ maxWidth: "90%" }}>
            <div className="media-content" >
              <p className="title is-6">
                {item.title ? item.title : item.name}
              </p>
              <p>
                {item.release_date
                  ? dateSetter(item.release_date)
                  : item.first_air_date
                  ? dateSetter(item.first_air_date)
                  : "No date registered"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
