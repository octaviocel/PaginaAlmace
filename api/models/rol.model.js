module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define("rol", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        estatus: {
            type: Sequelize.BOOLEAN
        }
    });

    return Rol;
};
