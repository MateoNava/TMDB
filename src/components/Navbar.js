import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Navbar = function () {
  return (
    <nav className="navbar has-background-black-ter mb-4">
      <Link to="/">
        <figure>
          <img
            style={{ marginLeft: "20px" }}
            className="image is-64x64"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt="TMDB Logo"
          ></img>
        </figure>
      </Link>

      <div className="navbar-item navbar-end has-text-white">
        <Link to="/movies">
          <button style={{ marginRight: "15px" }} className="button is-white is-rounded botones">
            Movies
          </button>
        </Link>
        <Link to="/tvshows">
          <button style={{ marginRight: "15px" }} className="button is-white is-rounded">
            TV Shows
          </button>
        </Link>
      </div>

      <div className="navbar-item navbar-end has-text-white">
        <Link to="/users">
          <button style={{ marginRight: "15px" }} className="button is-white">
            Users
          </button>
        </Link>
        <Link to="/search">
          <button style={{ marginRight: "15px" }} className="button is-white">
            <BsSearch />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
