module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {
        fechaPedido: {
            type: Sequelize.DATE
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