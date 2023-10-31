import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import Favorites from "../commons/Favorites";
import Swal from "sweetalert2";

const Sidebar = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const userContext = useContext(authContext);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  //Funcion para hacer el login
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((user) => {
        userContext.toggleAuth(user);
        Swal.fire(
          `Welcome ${user.username}`,
          "You are now logged in!",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your email or password is incorrect!",
          footer: '<a href="/">Try again</a>',
        });
      });
  };

  //Funcion para desloguearse
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/logout")
      .then((user) => userContext.toggleAuth(null))
      .then(() => navigate("/"))
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  //Pedido a la api al iniciar sesion de todos los favoritos del usuario que ingreso
  useEffect(() => {
    userContext.isAuthenticated &&
      axios
        .get(`/api/favorites/${userContext.user.id}`)
        .then((result) => setFavorites(result.data))
        .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.isAuthenticated && userContext.user.id]);

  return !userContext.isAuthenticated ? (
    <aside className="menu column is-one-fifth">
      <div className="is-flex is-justify-content-space-between">
        <p className="menu-label has-text-weight-bold">LOGIN</p>
      </div>
      <div className="container">
        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                onChange={onChangeEmail}
                className="input"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                onChange={onChangePassword}
                className="input"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="button is-dark">Login</button>
            <p style={{ marginTop: "5px", marginBottom: "5px" }}>OR</p>
          </div>
        </form>
        <Link to="/register">
          <div style={{ textAlign: "center" }}>
            <button className="button is-dark">Register</button>
          </div>
        </Link>
      </div>
    </aside>
  ) : (
    <aside className="menu column is-one-fifth">
      <div className="is-flex is-justify-content-space-between">
        <p className="menu-label has-text-weight-bold">
          HELLO {userContext.user.username}!
        </p>

        <button onClick={handleLogout} className="button is-success is-small">
          Logout
        </button>
      </div>
      <br></br>
      <div className="is-flex is-justify-content-space-between">
        <p className="menu-label has-text-weight-bold">Your favorites list</p>
      </div>
      <div>
        {favorites.map((item) => (
          <Favorites item={item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
