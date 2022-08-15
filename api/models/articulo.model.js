module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        cantidadStock: {
            type: Sequelize.INTEGER
        },
        precioUnitario: {
            type: Sequelize.DECIMAL
        },
        caducidad: {
            type: Sequelize.DATE
        },
        linkImage:{
            type: Sequelize.STRING
        }
    });

    return Item;
};