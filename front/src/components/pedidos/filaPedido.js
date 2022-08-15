import React, { useState } from "react";
import {
    Box, TextField, InputLabel, FormControl, Button, Input, InputAdornment,
    Select, MenuItem, IconButton, Container,

} from '@mui/material';
import articulosService from "../../services/articulos.service";


const FilaPedido = (a) => {

    React.useEffect(() => {
        console.log(a);
    }, []);

    const [enab, setEnab] = useState(true);
    //const [ante, setAnte] = useState(0);

    const generateArr = (num) => {
        const arr = [];
        for (let i = 1; i <= num; i++) {
            arr.push(i);
        }
        return arr;
    }
    var nArticulos = generateArr(50);

    var ante =0;
    return (
        <Container key={a.i}>
            <h5 >Articulo No. {a.i + 1}</h5>
            <FormControl variant="standard" margin="normal" sx={{ width: '30%', margin: '2%' }} >
                <InputLabel id="demo-simple-select-standard-label" fullWidth>Producto</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id={"pordoemo-producto" + a.i}
                    label="Producto"
                    fullWidth
                    onChange={(e) => {
                        setEnab(false);
                        articulosService.get(e.target.value)
                            .then(response => {
                                document.getElementById('standard-textarea123' + a.i).value = `$${response.data.precioUnitario}`;
                                document.getElementById('pordoemo-producto' + a.i).value = e.target.value;
                            }
                            )
                            .catch(e => {
                                console.log(e);
                            });
                    }}
                >
                    {a.articulos.map((pedi) => (
                        <MenuItem key={pedi.id} value={pedi.id}>{pedi.nombre}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            <FormControl variant="standard" margin="normal" sx={{ width: '30%', margin: '2%' }} >
                <InputLabel id="demo-simple-select-standard-label" fullWidth>Cantidad Requerida</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id={"selectCant" + a.i}
                    label="Cantidad Requerida"
                    fullWidth
                    disabled={enab}
                    onChange={async (e) => {
                        document.getElementById('selectCant' + a.i).value = e.target.value;
                        let ant = parseFloat(document.getElementById('standard-textarea-preciototal').value.slice(1));
                        let este = parseFloat(document.getElementById('standard-textarea123' + a.i).value.slice(1));
                        let precioTem =(este * e.target.value);
                        let suma = ant + precioTem;
                        if (ante === 0) {
                            await a.setPedido({ ...a.pedido, precio: suma.toFixed(2) });
                            ante = suma;
                        } else {
                            let lo = suma - ante;
                            await a.setPedido({ ...a.pedido, precio: lo.toFixed(2) });
                        }
                    }}
                >
                    {nArticulos.map((arti) => (
                        <MenuItem key={arti} value={arti}>{arti}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <TextField
                id={"standard-textarea123" + a.i}
                //label="Precio Unitario"
                placeholder="Precio Unitario"
                sx={{ width: '28%', margin: '2%' }}
                variant="standard"
                name="nombre"
                margin="normal"
                disabled
            />
        </Container>
    )
}

export default FilaPedido;