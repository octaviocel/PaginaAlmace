const db = require("../models/index.js");
const Item = db.article;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    if (!req.body.nombre &&
        !req.body.descripcion &&
        !req.body.cantidadStock &&
        !req.body.precioUnitario &&
        !req.body.caducidad &&
        !req.body.linkImage
    ) {
        res.status(400).send({
            message: "El contenido no puede ser vacio",
        });
        return;
    }

    const item = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cantidadStock: req.body.cantidadStock,
        precioUnitario:req.body.precioUnitario,
        caducidad:req.body.caducidad,
        linkImage: req.body.linkImage
    }

    Item.create(item)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send({
            message:"Error al crear Articulo" || err,
        });
    });
}

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
  
    Item.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
          "ss all" + err.message || "Ocurrio un error al recuperar todos los Articulos."
        });
      });
};


exports.findOne = (req, res) =>{
    const id = req.params.id;

    Item.findByPk(id).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: "Error al recuperar Articulo por id= "+  id
        });
    });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Item.update(req.body, {
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message: "Articulo se actualizo con exito"
            });
        }else{
            res.send({
                message: `Error al actualizar Articulo con id= ${id}!`
            });        
        }
    }).catch(err =>{
        res.status(500).send({
            message: "Error al actualizar Articulo con id= "+id
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Item.destroy({
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message: "Articulo eliminado con exito"
            });
        }else{
            res.send({
                message: `Error al eliminar Articulo con id =${id}`
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message:
            err.message || "Error al eliminar Articulo con id= "+id
        });
    });
}

exports.deleteAll = (req, res) => {
    Item.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({
          message: `${nums} Articulos fueron eliminados con exito!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || " Error",
        });
      });
  };