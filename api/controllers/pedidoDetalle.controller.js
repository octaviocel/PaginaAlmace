const db = require("../models/index.js");
const PedidoDeta = db.pedidoDetalle;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.cantidadProducto &&
        !req.body.precioProductos &&
        !req.body.pedidoId &&
        !req.body.itemId
    ) {
        res.status(400).send({
            message: "El contenido no puede ser vacio",
        });
        return;
    }

    const item = {
        cantidadProducto: req.body.cantidadProducto,
        precioProductos: req.body.precioProductos,
        pedidoId: req.body.pedidoId,
        itemId: req.body.itemId
    }

    PedidoDeta.create(item)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error al crear Pedido Detalle" || err,
            });
        });
}


exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

    PedidoDeta.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "ss all" + err.message || "Ocurrio un error al recuperar todos los Pedidos con Detalle."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    PedidoDeta.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al recuperar Detalle de Pedido por id= " + id
        });
    });
};

exports.findPedido = (req, res) => {
    const pedidoId = req.params.pedidoId;
    var condition = pedidoId ? { pedidoId: { [Op.iLike]: `%${pedidoId}%` } } : null;

    PedidoDeta.findAll(
        {
            where: {
                pedidoId: pedidoId
            }
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message:
                    "ss all" + err.message || "Ocurrio un error al recuperar todos los Pedidos con Detalle."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    PedidoDeta.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Pedido Detalle se actualizo con exito"
            });
        } else {
            res.send({
                message: `Error al actualizar Pedido Detalle con id= ${id}!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar Pedido Detalle con id= " + id
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    PedidoDeta.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Pedido detalle eliminado con exito"
            });
        } else {
            res.send({
                message: `Error al eliminar Pedido detalle con id =${id}`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error al eliminar Pedido detalle con id= " + id
        });
    });
}

exports.deleteAll = (req, res) => {
    PedidoDeta.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Pedidos detalle fueron eliminados con exito!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || " Error",
            });
        });
};
