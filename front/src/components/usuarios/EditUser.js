import React, { useState } from "react";
import {
    Box, TextField, InputLabel, FormControl, Button, Input, InputAdornment,
    Select, MenuItem, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimes, faLock } from '@fortawesome/free-solid-svg-icons';
import ListUser from "./ListUser";
import { createRoot } from "react-dom/client";

import Swal from "sweetalert2";
import usuarioService from "../../services/usuario.service";
import ChangePassword from "./ChangePassword";

export default function EditUser(id) {
    const [user, setUser] = useState({
        nombre: '',
        apePat: '',
        apeMat: '',
        direccion: '',
        rfc: '',
        fechaNac: new Date(),
        telefono: '',
        email: '',
        password: '',
        rol: 2
    })

    React.useEffect(() => {
        usuarioService.get(id.id)
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, []);

    const comeBackToList = (e) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListUser />);
    }

    const changePass = e =>{
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ChangePassword user={id.id}/>);
    }

    const updateUser = (e) => {
        e.preventDefault();
        if (!user.nombre || !user.apePat
            || !user.direccion || !user.fechaNac
            || !user.rfc || !user.telefono
            || !user.rol) {
            Swal.fire({
                icon: 'error',
                text: 'Campo vacio'
            })
        } else {
            usuarioService.update(id.id, user)
                .then(response => {
                    Swal.fire({
                        title: 'Exisoto',
                        text: 'Actualizados 1',
                        icon: 'success',
                        timer: 10000
                    })
                    comeBackToList();
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        text: 'No ha actualizado' + err
                    })
                })
        }
    }

    return (
        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Registro de Usuario</h5>

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
                            label="Nombre (s)"
                            placeholder="Nombres"
                            className="nombres"
                            multiline
                            fullWidth
                            variant="standard"
                            name="nombre"
                            margin="normal"
                            value={user.nombre}
                            onChange={(e) => {
                                setUser({
                                    ...user, nombre: e.target.value
                                })
                            }}
                        />
                        <TextField
                            id="standard-textarea"
                            label="Apellido Paterno"
                            placeholder="Apellido paterno"
                            className="nombres"
                            multiline
                            fullWidth
                            variant="standard"
                            name="nombre"
                            value={user.apePat}
                            margin="normal"
                            onChange={(e) => {
                                setUser({
                                    ...user, apePat: e.target.value
                                })
                            }}
                        />
                        <TextField
                            id="standard-textarea"
                            label="Apellido Materno"
                            placeholder="Apellido materno"
                            className="nombres"
                            multiline
                            fullWidth
                            variant="standard"
                            name="nombre"
                            margin="normal"
                            value={user.apeMat}
                            onChange={(e) => {
                                setUser({
                                    ...user, apeMat: e.target.value
                                })
                            }}
                        />
                    </Box>
                </div>
                <div className="card-block" style={{ width: "50%" }}>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha de Nacimiento"
                            minDate={new Date('1940-01-01')}
                            value={user.fechaNac}
                            onChange={(newValue) => {
                                setUser({ ...user, fechaNac: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br />
                    <TextField
                        id="standard-textarea"
                        label="RFC"
                        placeholder="RFC"
                        size="medium"
                        variant="standard"
                        //inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        margin="normal"
                        value={user.rfc}
                        onChange={(e) => {
                            setUser({
                                ...user, rfc: e.target.value
                            })
                        }}
                    />
                    <br />
                    <TextField
                        id="standard-textarea"
                        label="Telefono"
                        placeholder="Telefono"
                        size="medium"
                        variant="standard"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        margin="normal"
                        type="number"
                        value={user.telefono}
                        onChange={(e) => {
                            setUser({
                                ...user, telefono: e.target.value
                            })
                        }}
                    />
                </div>

            </div>

            <div className="card-block" style={{ width: "80%" }}>
                <Box>
                    <TextField
                        id="standard-textarea"
                        label="Dirección"
                        placeholder="Dirección"
                        multiline
                        fullWidth
                        value={user.direccion}
                        variant="standard"
                        name="nombre"
                        margin="normal"
                        onChange={(e) => {
                            setUser({
                                ...user, direccion: e.target.value
                            })
                        }}
                    />
                    <FormControl variant="standard" margin="normal" sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Rol</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={user.rol}
                            onChange={(e) => {
                                setUser({
                                    ...user, rol: e.target.value
                                })
                            }}
                            label="Rol"
                        >
                            <MenuItem value={1}>Administrador</MenuItem>
                            <MenuItem value={2}>Empleado</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                </Box>
                <FormControl margin="normal">
                    <Button variant="contained" color="secondary" component="span"
                        endIcon={<FontAwesomeIcon icon={faLock} />}
                        onClick={changePass}
                    >
                        Cambiar contraseña
                    </Button>
                </FormControl>
            </div>
            <div className="card-block" >
                <Button onClick={updateUser} variant="contained" component="span" endIcon={<FontAwesomeIcon icon={faAdd} />} style={{ marginRight: 5 }}>
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