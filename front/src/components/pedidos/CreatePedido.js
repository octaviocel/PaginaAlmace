import React, { useState } from "react";
import {
    Box, TextField, InputLabel, FormControl, Button, Input, InputAdornment,
    Select, MenuItem, IconButton, Container,

} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { createRoot } from "react-dom/client";

import Swal from "sweetalert2";
import ListPedido from "./ListPedido";
import pedidoService from "../../services/pedido.service";
import articulosService from "../../services/articulos.service";
import FilaPedido from "./filaPedido";
import pedidoDetaService from "../../services/pedidoDeta.service";

export default function CreatePedido() {
    const [pedido, setPedido] = useState({
        descripcion: '',
        fechaPedido: new Date(),
        fechaEntrega: new Date(),
        status: false,
        precio: 0.0,
        productos: 0,
        detalles: []
    })

    const [numero, setNumero] = useState(0);
    const [articulos, setArticulos] = useState(new Array());

    const generateArr = (num) => {
        const arr = [];
        for (let i = 1; i <= num; i++) {
            arr.push(i);
        }
        return arr;
    }
    var nm = generateArr(10);

    React.useEffect(() => {
        pedidoService.getMaximo()
            .then(response => {
                setNumero(response.data.id);
            })
            .catch(err => {
                console.log(err);
            })
        articulosService.getAll()
            .then(response => {
                var algo = [];
                algo = Array.from(response.data);
                setArticulos(algo);
            }
            )
            .catch(e => {
                console.log(e);
            });
    }, []);


    const comeBackToList = (e) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListPedido />);
    }

    const generateArticulos = () => {
        let rows = [];
        for (let i = 0; i < pedido.productos; i++) {
            rows.push(
                <FilaPedido i={i} precio={pedido.precio} setPedido={setPedido} articulos={articulos} pedido={pedido} />
            );
        }
        return rows;
    }


    const crearPedido = () => {
        //console.log(pedido);
        let pasa = false;
        for (let i = 0; i < pedido.productos; i++) {
            let cantidad = document.getElementById("selectCant" + i).value;
            let productoId = document.getElementById("pordoemo-producto" + i).value;
            let precioUni = parseFloat(document.getElementById('standard-textarea123' + i).value.slice(1));
            if (!cantidad || !productoId || !precioUni) {
                pasa = true;
            }
        }
        if (pedido.descripcion !== '' &&
            pasa === false &&
            pedido.productos !== 0) {
            const item = {
                descripcion: pedido.descripcion,
                fechaPedido: pedido.fechaPedido,
                fechaEntrega: pedido.fechaEntrega,
                status: pedido.status,
                precio: pedido.precio,
                cantidadProductos: pedido.productos
            }
            pedidoService.create(item)
                .then(response => {
                    for (let i = 0; i < pedido.productos; i++) {
                        let cantidad1 = document.getElementById("selectCant" + i).value;
                        let productoId1 = document.getElementById("pordoemo-producto" + i).value;
                        let precioUni1 = parseFloat(document.getElementById('standard-textarea123' + i).value.slice(1));
                        let item2 = {
                            cantidadProducto: cantidad1,
                            precioProductos: precioUni1,
                            pedidoId: response.data.id,
                            itemId: productoId1
                        }
                        pedidoDetaService.create(item2)
                            .then(response => {
                                console.log('done');
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    Swal.fire({
                        title:'Pedido Exitoso',
                        icon:'success',
                        text:'Pedido Creado con exito',
                        timer:3000
                    })
                    comeBackToList();
                })
                .catch(err => {
                    console.log(err);
                })
            //console.log('paso');
        } else {
            Swal.fire({
                title: 'Error al crear el pedido',
                text: 'No se completo el pedido a causa de campos sin llenar',
                icon: 'error'
            })
        }
    }



    return (
        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Registro de Pedido</h5>

                <div className="card-header-right"> <ul className="list-unstyled card-option"> <li className="first-opt"><i className="feather icon-chevron-left open-card-option"></i></li> <li><i className="feather icon-maximize full-card"></i></li> <li><i className="feather icon-minus minimize-card"></i></li> <li><i className="feather icon-refresh-cw reload-card"></i></li> <li><i className="feather icon-trash close-card"></i></li> <li><i className="feather icon-chevron-left open-card-option"></i></li> </ul> </div>

            </div>
            <div className="card-block" style={{ display: 'flex' }}>
                <Container sx={{ width: '50%' }} >
                    <TextField
                        id="standard-textarea"
                        label="Pedido No."
                        placeholder="Pedido No."
                        className="nombres"
                        multiline
                        fullWidth
                        variant="standard"
                        name="nombre"
                        margin="normal"
                        disabled
                        value={numero + 1}
                    />

                    <TextField
                        id="standard-textarea"
                        label="Descripción"
                        placeholder="Descripción"
                        className="nombres"
                        multiline
                        onChange={(e) => {
                            setPedido({
                                ...pedido, descripcion: e.target.value
                            })
                        }}
                        fullWidth
                        variant="standard"
                        name="nombre"
                        margin="normal"
                    />

                </Container>
                <Container sx={{ width: '50%' }}>
                    <Box>

                        <FormControl variant="standard" margin="normal" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label" fullWidth>Numero de Productos a Añadir</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Numero"
                                fullWidth
                                onChange={(e) => {
                                    setPedido({ ...pedido, productos: e.target.value })
                                }}
                            >
                                {nm.map(function (n) {
                                    return <MenuItem key={n} value={n}>{n}</MenuItem>
                                })}

                            </Select>
                        </FormControl>

                    </Box>
                </Container>


            </div>
            <Container >
                {generateArticulos()}
            </Container>
            <div className="card-block" style={{ width: "95%", paddingLeft: "5%" }}>
                <TextField
                    id="standard-textarea-preciototal"
                    label="Precio del Pedido"
                    placeholder="Precio del Pedido"
                    className="nombres"
                    multiline
                    onChange={(e) => {
                        setPedido({
                            ...pedido, precio: e.target.value
                        })
                    }}
                    fullWidth
                    variant="standard"
                    name="nombre"
                    margin="normal"
                    disabled
                    value={`$${pedido.precio}`}
                />

            </div>
            <div className="card-block" >
                <Button onClick={crearPedido}
                    variant="contained" component="span" endIcon={<FontAwesomeIcon icon={faAdd} />} style={{ marginRight: 5 }}>
                    Añadir Pedido
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