const axios = require("axios");
const express = require("express");
const { Users } = require("../models");
const router = express.Router();
const token = require("../config/tokens");
const { where } = require("sequelize");

//Ruta para crear un usuario en el caso que no exista el email en la base
router.post("/register", (req, res) => {
  return Users.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: req.body,
  })
    .then(([user, created]) => {
      !created
        ? res.status(400).send({ message: "This email is already registered" })
        : res.status(201).send(user);
    })
    .catch((err) => console.log(err));
});

//Ruta para hacer un login verificando que la contraseña sea correcta
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({
    where: {
      email: email,
    },
  })

    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }
      user.validatePassword(password).then((isValid) => {
        if (!isValid) {
          return res.sendStatus(401);
        } else {
          const info = {
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            age: user.age,
            id: user.id,
          };
          const clientToken = token.generateToken(info);
          res.cookie("token", clientToken);
          res.send(info);
        }
      });
    })
    .catch((err) => next(err));
});

//Ruta para desloguearse
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//Ruta para obtener todos los usuarios
router.get("/", (req, res) => {
  return Users.findAll().then((users) => res.send(users));
});

//Ruta para obtener la informacion de un usuario
router.get("/:id", (req, res) => {
  return Users.findByPk(req.params.id).then((users) => res.send(users));
});

module.exports = router;
