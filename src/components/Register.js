import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCheck, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = function () {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  //Funciones para detectar los cambios en los input, si me queda tiempo buscar la manera de acortar codigo
  const onChangeFullName = (event) => {
    setFullName(event.target.value);
  };
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  //Funcion para submitear los datos del form a la base de datos de Users
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/register", {
        fullname: fullName,
        username: username,
        email: email,
        password: password,
        age: age,
      })
      .then((res) => res.data)
      .then((data) => {
        Swal.fire("Great!", "Your account was created successfully", "success");
        navigate(`/`);
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This e-mail is already registered",
          footer: '<a href="/register">Try again</a>',
        })
      );
  };

  return (
    <div className="container" style={{ margin: "1% 5%" }}>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Full Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Name and Last Name"
              onChange={onChangeFullName}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Choose a username"
              onChange={onChangeUsername}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user">
                <FaUser />
              </i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check">
                <FaCheck />
              </i>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="Email"
              onChange={onChangeEmail}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope">
                <FaEnvelope />
              </i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password input"
              onChange={onChangePassword}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Age</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Text input"
              onChange={onChangeAge}
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" required />I agree to the{" "}
              <a href="https://www.plataforma5.la/">terms and conditions</a>
            </label>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
