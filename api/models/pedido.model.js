module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {
        descripcion:{
            type: Sequelize.STRING
        },
        fechaPedido: {
            type: Sequelize.DATE
        },
        cantidadProductos:{
            type: Sequelize.INTEGER
        },
        fechaEntrega:{
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        },
        precio: {
            type: Sequelize.DECIMAL
        }
    });

    return Pedido;
};