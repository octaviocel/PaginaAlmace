const db = require("../models/index.js");
const User = db.user;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    if (!req.body.nombre &&
        !req.body.apePat &&
        !req.body.apeMat &&
        !req.body.direccion &&
        !req.body.rfc &&
        !req.body.fechaNac &&
        !req.body.telefono &&
        !req.body.email &&
        !req.body.password &&
        !req.body.rol
    ) {
        res.status(400).send({
            message: "El contenido no puede ser vacio",
        });
        return;
    }

    const usu = {
        nombre: req.body.nombre,
        apePat: req.body.apePat,
        apeMat: req.body.apeMat,
        direccion: req.body.direccion,
        rfc: req.body.rfc,
        fechaNac: req.body.fechaNac,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol
    }

    User.create(usu)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error al crear Usuario" || err,
            });
        });
}

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "ss all" + err.message || "Ocurrio un error al recuperar todos los usuarios."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al recuperar Usuario por id= " + id
        });
    });
};
// Encontrar todos los Usuarios por correo
exports.findByEmail = (req, res) => {
    const email = req.params.email;
    var condition = email ? { email: { [Op.eq]: `${email}` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar usuarios por correo."
            });
        });
};

// Encontrar todos los Usuarios por correo
exports.findByRol = (req, res) => {
    const rol = req.params.rol;
    var condition = rol ? { rol: { [Op.eq]: `${rol}` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar usuarios por rol."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Usuario se actualizo con exito"
            });
        } else {
            res.send({
                message: `Error al actualizar Usuario con id= ${id}!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar Ususario con id= " + id
        });
    });
};

exports.updatePass = (req, res) => {
    const id = req.params.id;

    User.update(
        {
            password: req.body.password
        },
        {
            where: { id: id }
        }
    ).then(num => {
        if (num == 1) {
            res.send({
                message: "Usuario se actualizo con exito"
            });
        } else {
            res.send({
                message: `Error al actualizar Usuario con id= ${id}!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar Ususario con id= " + id
        });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Usuario eliminado con exito"
            });
        } else {
            res.send({
                message: `Error al eliminar Usuario con id =${id}`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error al eliminar Usuario con id= " + id
        });
    });
}

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Usarios detalle fueron eliminados con exito!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || " Error",
            });
        });
};