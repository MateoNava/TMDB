const { DataTypes, Model } = require("sequelize");
const db = require("../config/db");

class Favorites extends Model {}

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
    },
    movieTitle: {
      type: DataTypes.STRING,
    },
    movieImg: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "favorites" }
);

module.exports = Favorites;
