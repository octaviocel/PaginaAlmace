const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.rol = require("./rol.model.js")(sequelize, Sequelize);
db.user = require("./usuario.model.js")(sequelize, Sequelize);
db.article = require("./articulo.model.js")(sequelize, Sequelize);
db.pedido = require("./pedido.model.js")(sequelize, Sequelize);

db.pedidoDetalle = sequelize.define('pedidoDetalle', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidadProducto:{
        type : Sequelize.INTEGER,
        allowNull: false
    },
    precioProductos:{
        type: Sequelize.DECIMAL,
        allowNull:false
    }
    
});
db.pedido.belongsToMany(db.article, { through: db.pedidoDetalle });
db.article.belongsToMany(db.pedido, { through: db.pedidoDetalle });
db.pedidoDetalle.belongsTo(db.article);
db.pedidoDetalle.belongsTo(db.pedido);
db.article.hasMany(db.pedidoDetalle);
db.pedido.hasMany(db.pedidoDetalle);


module.exports = db;