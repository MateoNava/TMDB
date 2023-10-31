const axios = require("axios");
const express = require("express");
const { Users, Favorites } = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  return Favorites.findAll().then((favorites) =>
    res.status(200).send(favorites)
  );
});

router.post("/", (req, res) => {
  return Favorites.create(req.body)
    .then((favorite) => res.status(200).send(favorite))
    .catch((err) => console.log(err));
});

router.get("/:userId", (req, res) => {
  return Favorites.findAll({
    where: {
      userId: req.params.userId,
    },
  }).then((userFavs) => res.send(userFavs));
});

router.delete("/:userId/:id", (req, res) => {
  const userId = req.params.userId;
  const favId = req.params.id;
  return Favorites.destroy({
    where: {
      id:favId
    },
  })
  .then(()=>res.status(204).send("Deleted"))
  .catch(err=>console.log(err))
});

module.exports = router;
