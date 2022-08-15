const db = require("../models/index.js");
const Pedido = db.pedido;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) => {

    if (!req.body.fechaPedido &&
        !req.body.status &&
        !req.body.precio &&
        !req.body.descripcion &&
        !req.body.cantidadProductos
    ) {
        res.status(400).send({
            message: "El contenido no puede ser vacio",
        });
        return;
    }

    const item = {
        descripcion: req.body.descripcion,
        fechaPedido: req.body.fechaPedido,
        fechaEntrega: req.body.fechaEntrega,
        status: req.body.status,
        precio: req.body.precio,
        cantidadProductos: req.body.cantidadProductos
    }

    Pedido.create(item)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error al crear Pedido" || err,
            });
        });
}


exports.findAll = (req, res) => {
    const fechaPedido = req.query.fechaPedido;
    var condition = fechaPedido ? { fechaPedido: { [Op.iLike]: `%${fechaPedido}%` } } : null;

    Pedido.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "ss all" + err.message || "Ocurrio un error al recuperar todos los Pedidos."
            });
        });
};

exports.findByMaxId = (req, res) => {
    Pedido.findOne({
        attributes:['id'],
        order: [
            [sequelize.fn('max', sequelize.col('id')),'DESC']
        ],
        group:[
            'id'
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar estudiante por noControl."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Pedido.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al recuperar Pedido por id= " + id
        });
    });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Pedido se actualizo con exito"
            });
        } else {
            res.send({
                message: `Error al actualizar Pedido con id= ${id}!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar Pedido con id= " + id
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Pedido.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Pedido eliminado con exito"
            });
        } else {
            res.send({
                message: `Error al eliminar Pedido con id =${id}`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error al eliminar Pedido con id= " + id
        });
    });
}

exports.deleteAll = (req, res) => {
    Pedido.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Pedidos fueron eliminados con exito!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || " Error",
            });
        });
};