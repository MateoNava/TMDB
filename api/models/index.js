const Users = require("./Users");
const Favorites = require("./Favorites");

Users.hasMany(Favorites, { foreignKey: "userId" });

module.exports = { Users, Favorites };
