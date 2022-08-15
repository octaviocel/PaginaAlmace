const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const { uploadFile, getFileStream, deleteImagen } = require('./s3')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const PUERTO = process.env.API_PORT;

//route
//base_url => localhost:PUERTO/ruta

app.get("/", (req, res) => {
    res.send("Hola, Bienvenido a la aplicacion de alamacen");
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const sync = (process.env.MA_DB_SYNC === 'true');

const db = require("./models");

db.sequelize.sync({ alter: sync }).then(() => {
    if (sync) {
        console.log("Sincronizar db");
    } else {
        console.log("No se harán cambios a la db");
    }
});

// Subir imagenes a S3
app.post('/images', upload.single('image'), async (req, res) => {
    const file = req.file
    //console.log(file)
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    //console.log(result)
    res.send({
        imagePath: result.Key
    })
})

//regresar imagen

app.get('/images/:key', (req, res) => {
    const key = req.params.key
    //console.log(key);
    const imagen = getFileStream(key)

    res.send(imagen)
})

app.delete('/images/:key',async (req, res) => {
    const key = req.params.key;
    const data = await deleteImagen(key);
    res.send(data)
})

//end imagenes

//routes
require("./routes/usuario.route.js")(app);
require("./routes/articulo.route.js")(app);
require("./routes/pedido.route.js")(app);
require("./routes/pedidoDetalle.route.js")(app);

app.listen(PUERTO, (error) => {
    if (error) throw error;
    console.log("Escuchando por el puerto", PUERTO);
});
