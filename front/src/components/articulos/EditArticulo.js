import React, { useState } from "react";
import {
    Box, TextField, InputLabel, FormControl, Button, Input, InputAdornment,
    Stack, Card, CardMedia, CardActions, Fade, CircularProgress
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';

import { createRoot } from 'react-dom/client';
import ListArticulos from "./ListArticulos";
import Swal from "sweetalert2";
import ImagesService from "../../services/images.service";
import ArticulosService from "../../services/articulos.service";

export default function EditArticulo(id) {
    const [articulo, setArticulo] = useState({
        nombre: '',
        descripcion: '',
        cantidadStock: 0,
        precioUnitario: 0.0,
        caducidad: new Date(),
        linkImage: '',
        image: null
    });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        ArticulosService.get(id.id)
            .then(response => {
                setArticulo(response.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, []);

    const subir = async (e) => {
        setLoading(true);
        const image = e.target.files[0];
        //image = articulo.image;
        //console.log(image);
        if (image != null) {
            setArticulo({ ...articulo, image: image });
            let data = new FormData();
            data.append('image', image);
            await ImagesService.create(data)
                .then(response => {
                    setArticulo({
                        ...articulo,
                        linkImage: response.data.imagePath
                    })
                    var previo = document.getElementById("imagenprevia");
                    ImagesService.get(response.data.imagePath)
                        .then(response => {
                            setLoading(false);
                            previo.src = response.data
                            console.log("exito")
                        })
                        .catch(error => {
                            console.log(error);
                        });

                })
        }
        else {
            Swal.fire({
                icon: 'error',
                text: "No ha cargado un archivo aun."
            })
        }
    }

    const getImage = (id, key) => {
        ImagesService.get(key)
            .then(response => {
                document.getElementById(id).src = response.data
            })
            .catch(error => { console.log(error); });
    }

    const comeBackToList = (e) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListArticulos />);
    }

    const actualizarArticulo = (e) => {
        e.preventDefault();
        if (!articulo.nombre || !articulo.cantidadStock ||
            !articulo.descripcion || !articulo.precioUnitario) {
            Swal.fire({
                icon: 'error',
                text: 'Campo vacio'
            })
        } else if (articulo.linkImage === 'https://images.homify.com/c_fill,f_auto,q_0,w_740/v1526483607/p/photo/image/2561426/3.jpg') {
            Swal.fire({
                icon: 'error',
                text: 'No ha agregado foto del producto'
            })
        } else {
            ArticulosService.update(id.id, articulo)
                .then(response => {
                    Swal.fire({
                        title: 'Exisoto',
                        text:'Actualizados 1',
                        icon:'success',
                        timer:10000
                    })
                    comeBackToList();
                })
                .catch(err=>{
                    Swal.fire({
                        icon: 'error',
                        text: 'No ha actualizado'+err
                    })
                })

        }
    }

    const imprimir = () => {
        console.log(articulo);
    }


    return (
        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Detalles de Articulo</h5>

                <div className="card-header-right"> <ul className="list-unstyled card-option"> <li className="first-opt"><i className="feather icon-chevron-left open-card-option"></i></li> <li><i className="feather icon-maximize full-card"></i></li> <li><i className="feather icon-minus minimize-card"></i></li> <li><i className="feather icon-refresh-cw reload-card"></i></li> <li><i className="feather icon-trash close-card"></i></li> <li><i className="feather icon-chevron-left open-card-option"></i></li> </ul> </div>

            </div>
            <div style={{ display: "flex", alignItems: "stretch" }}>
                <div className="card-block" style={{ width: "60%" }}>
                    <Box
                        sx={{
                            width: 600,
                            maxWidth: '60%',
                        }}>
                        <TextField
                            id="standard-textarea"
                            value={articulo.nombre}
                            label="Nombre del Producto"
                            placeholder="Producto"
                            className="nombres"
                            multiline
                            fullWidth
                            variant="standard"
                            name="nombre"
                            onChange={(e) => {
                                setArticulo({ ...articulo, nombre: e.target.value })
                            }}
                            margin="normal"
                        ></TextField>
                        <TextField
                            id="outlined-multiline-static"
                            value={articulo.descripcion}
                            label="Descripción"
                            multiline
                            rows={5}
                            placeholder="Descripción"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                                setArticulo({ ...articulo, descripcion: e.target.value })
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="standard-textarea"
                            value={articulo.cantidadStock}
                            label="Cantidad de ingreso"
                            placeholder="Cantidad"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                                setArticulo({ ...articulo, cantidadStock: e.target.value })
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            margin="normal"
                            type="number"
                        />

                        <FormControl fullWidth variant="standard" margin="normal">
                            <InputLabel htmlFor="standard-adornment-amount">Precio por pieza</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={articulo.precioUnitario}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                type="number"
                                onChange={(e) => {
                                    setArticulo({ ...articulo, precioUnitario: e.target.value })
                                }}
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className="card-block" style={{ width: "40%" }}>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Caducidad"
                            minDate={new Date('2021-01-01')}
                            value={articulo.caducidad}
                            onChange={(newValue) => {
                                setArticulo({ ...articulo, caducidad: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br /><br />Imagen del producto
                    <Card sx={{ maxWidth: 350 }}>
                        <CardMedia
                            component="img"
                            id="imagenprevia"
                            alt="preview"
                            height="220"
                        //image={articulo.linkImage}
                        />
                        {getImage('imagenprevia', articulo.linkImage)}
                        <CardActions>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" style={{ display: "none" }} onChange={subir} />
                                    <Button variant="contained" component="span" >
                                        Subir Imagen
                                    </Button>
                                </label>
                            </Stack>
                            <Fade
                                in={loading}
                                style={{
                                    transitionDelay: loading ? '800ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress />
                            </Fade>
                        </CardActions>
                    </Card>

                </div>


            </div>
            <div className="card-block" >
                <Button onClick={actualizarArticulo} variant="contained" component="span" endIcon={<FontAwesomeIcon icon={faAdd} />} style={{ marginRight: 5 }}>
                    Actualizar
                </Button>
                <Button variant="contained" color="error" component="span"
                    endIcon={<FontAwesomeIcon icon={faTimes} />}
                    onClick={comeBackToList}
                >
                    Cancelar
                </Button>
            </div>
        </div >
    )
}