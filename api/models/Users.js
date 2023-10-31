const { DataTypes, Model } = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Users extends Model {
  hashCreator(password, salt) {
    return bcrypt.hash(password, salt);
    //.then(hash=>{this.password = hash})
  }
  validatePassword(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password);
  }
}

Users.init(
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hashCreator(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = Users;
