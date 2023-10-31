import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserInfo = function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userFavs, setUserFavs] = useState([]);

  //Pedido axios para obtener los datos de un usuario particular
  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((result) => result.data)
      .then((data) => setUser(data));
  }, [id]);

  //Pedido axios para obtener los favoritos del usuario en particular
  useEffect(() => {
    axios
      .get(`/api/favorites/${id}`)
      .then((result) => result.data)
      .then((data) => setUserFavs(data));
  }, [id]);

  return (
    <div className="column">
      <div
        className="notification "
        style={{ backgroundColor: "#D2E3E8", margin: "10px", color: "black" }}
      >
        <button
          onClick={() => {
            navigate(-1);
          }}
          class="button is-ghost"
        >
          <GrLinkPrevious /> Back
        </button>
        <h1 className="title is-spaced">{user.fullname}</h1>
        <h2 className="subtitle">Username: {user.username}</h2>
        <h4 className="subtitle">E-mail: {user.email}</h4>

        <div className="content">
          <h3 className="subtitle">FAVORITES:</h3>
          {userFavs[0] ? (
            userFavs.map((fav) => (
              <div
                key={fav.id}
                className="container"
                style={{ margin: "2%", color: "white" }}
              >
                <div className="notification has-background-black-ter">
                  <div className="is-flex is-justify-content-space-between">
                    <div className="is-flex is-justify-content-space-between">
                      <h3 className="title">{fav.movieTitle} </h3>
                      <p> ---- </p>
                      {fav.type === "movies" ? <p>Movie</p> : <p>Tv Show</p>}
                    </div>
                    <Link to={`/${fav.type}/${fav.movieId}`}>
                      <button className="button is-info is-light">More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Doesn´t have favorites</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
