import React, { useState } from "react";

import {
    Box, TextField, InputLabel, FormControl, Button, Input, InputAdornment,
    Select, MenuItem, IconButton,

} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ListUser from "./ListUser";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";
import usuarioService from "../../services/usuario.service";

export default function ChangePassword(user) {

    const [newPass, setNewPass] = useState({       
        password:'',
        showPassword:false
    });
    const [confirmPass, setConfirmPass] = useState({
        password:'',
        showPassword:false
    });    

    const comeBackToList = (e) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListUser />);
    }

    const handleClickShowPassword = () => {
        setNewPass({
            ...newPass,
            showPassword: !newPass.showPassword,
        });
    };

    const handleClickShowPassword1 = () => {
        setConfirmPass({
            ...confirmPass,
            showPassword: !confirmPass.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const updatePassword = (e) =>{
        e.preventDefault();
        if(newPass.password === confirmPass.password){
            let sha256 = require('js-sha256');
            const userdata={
                password: sha256(newPass.password)
            }
            usuarioService.updatePass(user.user,userdata)
                .then(response => {
                    Swal.fire({
                        title: 'Exisoto',
                        text: 'Se actualizo correctamente la contraseña',
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
            
        }else{
            Swal.fire(
                {
                    title:'Error',
                    text:'No coinciden los campos de contraseña',
                    icon:'error'
                }
            )
        }
    }

    return (
        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Cambio de contraseña Seguro</h5>

                <div className="card-header-right"> <ul className="list-unstyled card-option"> <li className="first-opt"><i className="feather icon-chevron-left open-card-option"></i></li> <li><i className="feather icon-maximize full-card"></i></li> <li><i className="feather icon-minus minimize-card"></i></li> <li><i className="feather icon-refresh-cw reload-card"></i></li> <li><i className="feather icon-trash close-card"></i></li> <li><i className="feather icon-chevron-left open-card-option"></i></li> </ul> </div>

            </div>
            <div style={{ display: 'block', paddingLeft:'2%'}}>
                <FormControl sx={{ width: '50ch' }} variant="standard" margin="normal">
                    <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={newPass.showPassword ? 'text' : 'password'}
                        value={newPass.password}
                        onChange={(e) => {
                            setNewPass({ ...newPass, password: e.target.value })
                        }}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    hidden
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}>

                                    {newPass.showPassword ? <VisibilityOff /> : <Visibility />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br />
                <FormControl sx={{ width: '50ch' }} variant="standard" margin="normal">
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={confirmPass.showPassword ? 'text' : 'password'}
                        value={confirmPass.password}
                        onChange={(e) => {
                            setConfirmPass
                            ({ ...confirmPass, password: e.target.value })
                        }}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    hidden
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword}>

                                    {confirmPass.showPassword ? <VisibilityOff /> : <Visibility />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div className="card-block" >
                    <Button onClick={updatePassword} variant="contained" component="span" endIcon={<FontAwesomeIcon icon={faAdd} />} style={{ marginRight: 5 }}>
                        Actualizar
                    </Button>
                    <Button variant="contained" color="error" component="span"
                        endIcon={<FontAwesomeIcon icon={faTimes} />}
                        onClick={comeBackToList}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}