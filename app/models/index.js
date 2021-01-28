const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false,
    freezeTableName: true
},

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.form = require("./form.model")(sequelize, Sequelize);
db.contact = require("./contact.model")(sequelize, Sequelize);
db.post = require("./post.model")(sequelize, Sequelize);
db.image = require("./image.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);


module.exports = db;