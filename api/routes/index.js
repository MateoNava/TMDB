const axios = require("axios");
const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const favoritesRouter = require("./favorites");

router.use("/users", usersRouter);
router.use("/favorites", favoritesRouter);

//Index conexion routers

module.exports = router;
