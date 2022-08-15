module.exports = app =>{
    const pedidoDetalle = require("../controllers/pedidoDetalle.controller.js");

    var router = require ("express").Router();

    router.post("/registrar", pedidoDetalle.create);

    router.get("/", pedidoDetalle.findAll);

    router.get("/:pedidoId", pedidoDetalle.findPedido);

    router.put("/:id", pedidoDetalle.update);

    router.delete("/:id", pedidoDetalle.delete);

    router.delete("/", pedidoDetalle.deleteAll);

    app.use('/pedidoDetalle', router);
};