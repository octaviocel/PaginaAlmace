import React, { useState, useEffect } from "react";
import '../css/login.css';
import '../css/util.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import UsuarioService from "../services/usuario.service";

export default function Login({ usuario, setUsuario }) {
    const [correo, setCorreo] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();

    const onChangeCorreo = event => setCorreo(event.target.value);
    const onChangePwd = event => setPwd(event.target.value);

    const iniciarSesion = (e) => {   
        e.preventDefault();
        var sha256 = require('js-sha256');
        if (correo && pwd) {
            //console.log(correo);
            UsuarioService.findByEmail(correo)
                .then(response => {
                    /*if (response.data == 0) {
                        Swal.fire({
                            icon: 'error',
                            text: "No existe el usuario."
                        })
                    } else {*/
                        let supposePwd = response.data[0].password;
                        //console.log(supposePwd);
                        //console.log(sha256(pwd));
                        if (supposePwd === sha256(pwd)) {
                            
                            let sesionIniciada = response.data[0];
                            sesionIniciada.sesion = true;
                            sessionStorage.setItem('usuario', JSON.stringify(sesionIniciada));

                            setUsuario(sesionIniciada);
                            navigate('/dashboard');
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: "Credenciales incorrectas."
                            })
                        }
                    //}
                })
                .catch(e => {
                    console.log(e.message)
                    Swal.fire({
                        icon: 'error',
                        text: "Hubo un error en la solicitud."
                    })
                });
        }
        else {            
            Swal.fire({
                icon: 'warning',
                text: "Hay campos requeridos vacios."
            })
        }
    }

    const containerStyle = {
        backgroundImage: "url(bg-01.jpg)"
    };
    if (usuario) {
        return <Navigate to='/dashboard' />
    }
    else {
        return (
            <div className="limiter">
                <div className="container-login100" style={containerStyle}>
                    <div className="wrap-login100">
                        <form className="login100-form validate-form">
                            <span className="login100-form-logo">
                                <i className="zmdi zmdi-landscape">{/*logoempres*/} <img src="logo1.png" width={80} height={50} /></i>
                            </span>
                            <span className="login100-form-title p-b-34 p-t-27">
                                Log in
                            </span>
                            <div className="wrap-input100 validate-input">
                                <FontAwesomeIcon icon={faUser} color={"white"} />
                                <input className="input100" type="text" name="username" placeholder="Correo" value={correo} onChange={onChangeCorreo}/>
                                <span className="focus-input100" ></span>
                            </div>
                            <div className="wrap-input100 validate-input" >
                                <FontAwesomeIcon icon={faUnlockKeyhole} color={"white"} />
                                <input className="input100" type="password" name="pass" placeholder="Password" value={pwd} onChange={onChangePwd}/>
                                <span className="focus-input100" ></span>
                            </div>
                            <div className="contact100-form-checkbox">
                                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                <label className="label-checkbox100" htmlFor="ckb1">
                                    Remember me
                                </label>
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={iniciarSesion}>
                                    Login
                                </button>
                            </div>
                            <div className="text-center p-t-90">
                                <a className="txt1">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}