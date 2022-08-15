import React, { useState } from "react";
import {
    Box, TextField, InputLabel, FormControl, Button, Input, InputAdornment,
    Select, MenuItem, IconButton, Container, Chip

} from '@mui/material';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faChevronLeft, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { createRoot } from "react-dom/client";

import ListPedido from "./ListPedido";
import pedidoService from "../../services/pedido.service";
import pedidoDetaService from "../../services/pedidoDeta.service";
import articulosService from "../../services/articulos.service";
import RowView from "./RowView";

export default function ViewPedido({ id }) {
    const [pedido, setPedido] = useState([]);
    const [detalles, setDetalles] = useState(new Array());


    React.useEffect(() => {
        pedidoService.get(id)
            .then(response => {
                setPedido(response.data);
                pedidoDetaService.get(response.data.id)
                    .then(response => {
                        setDetalles(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    const comeBackToList = (e) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListPedido />);
    }

    const imprimir = () => {
        console.log(detalles);
    }

    
    const regresar = () => {
        let rows = [];
        for (let i = 0; i < detalles.length; i++) {            
            rows.push(
                <RowView id={detalles[i].itemId} detalles={detalles[i]} />
            )
        }
        return rows

    }


    return (
        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Detalles del Pedido</h5>

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
                        value={pedido.id ? pedido.id : ""}
                    />
                    <TextField
                        id="standard-textarea"
                        label="Descripción"
                        placeholder="Descripción"
                        className="nombres"
                        multiline
                        fullWidth
                        variant="standard"
                        name="nombre"
                        margin="normal"
                        disabled
                        value={pedido.descripcion ? pedido.descripcion : ""}
                    />

                </Container>
                <Container sx={{ width: '50%', display: 'flex' }}>
                    <Box sx={{ width: '40%', marginLeft: '2%', marginRight: '2%' }}>
                        <TextField
                            id="standard-textarea"
                            value={pedido.precio ? `$${pedido.precio}`: ""}
                            label="Precio Total "
                            placeholder="Precio del Pedido"
                            className="nombres"
                            multiline
                            fullWidth
                            variant="standard"
                            name="nombre"
                            margin="normal"
                            disabled
                        />

                        <TextField
                            id="standard-textarea"
                            value={pedido.cantidadProductos ? pedido.cantidadProductos : ""}
                            label="Cantidad de Productos"
                            placeholder="Cantidad de Productos"
                            className="nombres"
                            multiline
                            fullWidth
                            variant="standard"
                            name="nombre"
                            margin="normal"
                            disabled
                        />
                    </Box>
                    <Box sx={{ width: '50%', marginLeft: '2%', marginRight: '2%' }}>
                        {pedido.status ?
                            <Chip icon={<FontAwesomeIcon icon={faCheck} />} sx={{ width: '100%', marginTop: "8%", marginBottom: "7%" }} label="Entrega Completa" variant="outlined" color="success" />
                            :
                            <Chip icon={<FontAwesomeIcon icon={faExclamation} />} sx={{ width: '100%', marginTop: "8%", marginBottom: "7%" }} label="Sin Entregar" variant="outlined" color="error" />
                        }

                        <Box sx={{ width: '100%', display: 'flex' }}>
                            <TextField
                                id="standard-textarea"
                                value={pedido.fechaPedido ? pedido.fechaPedido.substr(0, 10) : ""}
                                label="Fecha de Pedido"
                                placeholder="Fecha de Pedido"
                                className="nombres"
                                multiline
                                fullWidth
                                disabled
                                variant="standard"
                                name="nombre"
                                sx={{ width: '40%', marginRight: '2%' }}
                            />
                            <TextField
                                id="standard-textarea"
                                value={pedido.status ?
                                    pedido.fechaEntrega
                                    :
                                    "No se ha entregado aun"}
                                label="Fecha de Entrega"
                                sx={{ width: '55%' }}
                                placeholder="Fecha de Entrega"
                                className="nombres"
                                multiline
                                fullWidth
                                disabled
                                variant="standard"
                                name="nombre"
                            />
                        </Box>

                    </Box>
                </Container>


            </div>
            <Container sx={{ margin: '3%', width: '100%' }}>
                <h6>Descripci&oacute;n de Productos</h6>
                {regresar()}
            </Container>
            <div className="card-block" style={{ width: "95%", paddingLeft: "5%" }}>


            </div>
            <div className="card-block" >
                <Button variant="contained" color="secondary" component="span"
                    endIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                    onClick={comeBackToList}
                >
                    Regresar
                </Button>
            </div>
        </div >
    )
}