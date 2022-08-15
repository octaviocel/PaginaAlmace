import React, { useState } from "react";
import {
    Box, TextField
} from '@mui/material';

import articulosService from "../../services/articulos.service";

export default function RowView({ id, detalles }) {
    const [name, setName] = useState('');
    const [ar, setAr]= useState({
        canti:0,
        pres:0.0,
        precio:0.0
    })

    React.useEffect(() => {
        articulosService.get(id)
            .then(response => {
                setName(response.data.nombre);
            })
            .catch(err => {
                console.log(err);
            })
        setAr({
            ...ar, canti: parseInt(detalles.cantidadProducto), pres: parseFloat(detalles.precioProductos),
            precio:  parseInt(detalles.cantidadProducto)*parseFloat(detalles.precioProductos)
        })
    }, []);

    return (
        <>
            <Box key={detalles.id}>
                <TextField
                    id="standard-textarea"
                    value={detalles.id ? detalles.id : ""}
                    label="Código"
                    placeholder="Código"
                    className="nombres"
                    multiline
                    variant="standard"
                    name="nombre"
                    disabled
                    sx={{ margin: '2%', width: '7%' }}
                />
                <TextField
                    id="standard-textarea"
                    label="Nombre"
                    value={name}
                    placeholder="Nombre"
                    className="nombres"
                    multiline
                    variant="standard"
                    name="nombre"
                    disabled
                    sx={{ margin: '2%', width: '20%' }}
                />
                <TextField
                    id="standard-textarea"
                    label="Cantidad"
                    value={ar.canti}
                    placeholder="Cantidad"
                    className="nombres"
                    multiline
                    variant="standard"
                    name="nombre"
                    disabled
                    sx={{ margin: '2%', width: '10%' }}
                />
                <TextField
                    id="standard-textarea"
                    value={"$"+ar.pres}
                    label="Precio Unitario"
                    placeholder="Precio Unitario"
                    className="nombres"
                    multiline
                    variant="standard"
                    name="nombre"
                    disabled
                    sx={{ margin: '2%', width: '15%' }}
                />
                <TextField
                    id="standard-textarea"
                    label="Subtotal"
                    value={"$"+ar.precio.toFixed(2)}
                    placeholder="Subtotal"
                    className="nombres"
                    multiline
                    variant="standard"
                    name="nombre"
                    disabled
                    sx={{ margin: '2%', width: '15%' }}
                />
            </ Box>
            <br />
        </>
    )
}