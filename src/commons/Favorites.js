import axios from "axios";
import React, { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

const Favorites = function ({ item }) {
  const userContext = useContext(authContext);

  //Funcion para eliminar de la lista de favoritos de un usuario
  const handleDeleteFromFavorites = (favId) => {
    axios
      .delete(`/api/favorites/${userContext.user.id}/${favId}`)
      .then((response) => {
        //Refresh de la pagina para que se actualice la lista de favoritos
        window.location.reload();
        console.log("Deleted from favorites");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        paddingLeft: "5px",
        paddingTop: "20px",
        borderTop: "2px solid black",
        borderRadius: "10px",
        height: "180px",
      }}
      key={item.id}
      className="is-flex is-justify-content-space-between"
    >
      <div className="card-image">
        <figure className="image is-128x128">
          <img
            style={{ maxWidth: "80%" }}
            src={"https://image.tmdb.org/t/p/original/" + item.movieImg}
            alt="Placeholder"
          />
        </figure>
      </div>
      <section className="section is-small">
        <h2 className="">{item.movieTitle}</h2>
        <button
          onClick={() => handleDeleteFromFavorites(item.id)}
          className="button is-danger is-small"
        >
          Delete
        </button>
      </section>
    </div>
  );
};

export default Favorites;
