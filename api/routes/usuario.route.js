module.exports = app =>{
    const usuarios = require("../controllers/usuario.controller.js");

    var router = require ("express").Router();

    //Crear un nuevo usuario
    router.post("/registrar", usuarios.create);

    //REcuperar todos los Usuarios
    router.get("/", usuarios.findAll);

    //Encontrar Usuario por id
    router.get("/:id", usuarios.findOne);

    //Actualizar usuario por id
    router.put("/:id", usuarios.update);

    //Eliminar un usuario por id
    router.delete("/:id", usuarios.delete);

    //Eliminar todos los usuarios de la base de datos
    router.delete("/", usuarios.deleteAll);

    app.use('/usuarios', router);
};