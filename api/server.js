// Configuración del server

const express = require("express");
const app = express();
const db = require("./config/db");
const { Users, Favorites } = require("./models");
const routes = require("./routes");

app.use(express.json());

app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(function () {
    app.listen(3001, () =>
      console.log(
        "Servidor escuchando en el puerto 3001 http://localhost:3001/"
      )
    );
  })
  .catch(console.error);
