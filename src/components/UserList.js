import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const UserList = function () {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [usersSearched, setUsersSearched] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/users`)
      .then((result) => result.data)
      .then((data) => setUsers(data));
  }, []);

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setUsersSearched(
      users.filter((user) => user.username.toLowerCase() === search)
    );
  };

  return (
    <div style={{ textAlign: "center" }} className="column container">
      <h1 className="title">All Users</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          onChange={onChangeSearch}
          style={{ maxWidth: "50%" }}
          className="input is-rounded"
          type="text"
          placeholder="Search by UserName"
        ></input>
      </form>
      {usersSearched[0]
        ? usersSearched.map((user) => (
            <Link key={user.id} to={`/users/${user.id}`}>
              <div className="container">
                <div
                  style={{
                    border: "2px solid black",
                    borderRadius: "20px",
                    margin: "2%",
                    marginLeft: "5%",
                    marginRight: "5%",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    backgroundColor: "#D2E3E8",
                    color: "black",
                  }}
                  className="notification is-primary"
                >
                  <div className="is-flex is-justify-content-space-between">
                  <FaUserAlt size={40} />
                    <p>- </p>
                    <span>
                      <h2 className="title">{user.username}</h2>
                      <p className="subtitle">{user.fullname}</p>{" "}
                    </span>
                    <p>- </p>

                    <p className="subtitle">{user.email}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        : users.map((user) => (
            <Link key={user.id} to={`/users/${user.id}`}>
              <div className="container">
                <div
                  style={{
                    border: "2px solid black",
                    borderRadius: "20px",
                    margin: "2%",
                    marginLeft: "5%",
                    marginRight: "5%",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    backgroundColor: "#D2E3E8",
                    color: "black",
                  }}
                  className="notification is-primary"
                >
                  <div className="is-flex is-justify-content-space-between">
                    <FaUserAlt size={40} />
                    <p>- </p>
                    <span>
                      <h2 className="title">{user.username}</h2>
                      <p className="subtitle">{user.fullname}</p>{" "}
                    </span>
                    <p>- </p>

                    <p className="subtitle">{user.email}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default UserList;
