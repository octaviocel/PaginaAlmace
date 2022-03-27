module.exports = app =>{
    const articulos = require("../controllers/articulo.controller.js");

    var router = require("express").Router();

    router.post("/registrar", articulos.create);

    router.get("/", articulos.findAll);

    router.get("/:id", articulos.findOne);

    router.put("/:id", articulos.update);

    router.delete("/:id", articulos.delete);

    router.delete("/", articulos.deleteAll);

    app.use('/articulos', router);
};