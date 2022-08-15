module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        nombre: {
            type: Sequelize.STRING
        },
        apePat: {
            type: Sequelize.STRING
        },
        apeMat: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        rfc: {
            type: Sequelize.STRING
        },
        fechaNac: {
            type: Sequelize.DATE
        },
        telefono: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        rol:{
            type: Sequelize.INTEGER
        }
    });

    return User;
};