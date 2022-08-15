import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import '../css/style.css';
//import '../css/widget.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SideBarDash from "./SideBar";
import usuarioService from "../services/usuario.service";


export default function Dashboard({ usuario }) {
    const [usuario1, setUsuario1] = useState();
    const [menu, setMenu] = useState(false);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("usuario");
        if (loggedInUser) {
            try {
                const foundUser = JSON.parse(loggedInUser);
                setUsuario1(foundUser);
            } catch (error) {
                console.log("Error");
            }
        }

    }, []);

    const contraer = () => {
        let w1=document.getElementById('contenedorgrande').offsetWidth;
        document.getElementById('navegador').style.display = 'none';
        //document.getElementById('contenedorLarge').style.position = 'relative';
        document.getElementById('contenedorgrande').style.position = 'absolute';
        document.getElementById('contenedorgrande').style.width = '100%';
        setMenu(true);
        setWidth(w1);
        //console.log(w1)
    }

    const ver = () => {
        document.getElementById('navegador').style.display = 'block';
        document.getElementById('contenedorgrande').style.width = '86%';
        document.getElementById('contenedorgrande').style.position = 'relative';        
        setMenu(false);
    }


    if (!usuario) {
        return <Navigate to='/' />
    }
    else {
        return (
            <>
                <div className="loader-bg" style={{ display: "none" }}>
                    <div className="loader-bar"></div>
                </div>

                <div id="pcoded" className="pcoded iscollapsed" nav-type="st2" theme-layout="vertical" vertical-placement="left" vertical-layout="wide" pcoded-device-type="desktop" vertical-nav-type="expanded" vertical-effect="shrink" vnavigation-view="view1" fream-type="theme1" layout-type="light">
                    <div className="pcoded-overlay-box"></div>
                    <div className="pcoded-container navbar-wrapper">

                        <nav className="navbar header-navbar pcoded-header iscollapsed" header-theme="themelight1" pcoded-header-position="fixed">
                            <div className="navbar-wrapper">
                                <div className="navbar-logo" logo-theme="theme6">
                                    <a href="/dashboard">
                                        <i className="feather icon-menu icon-toggle-right">
                                            <img className="img-fluid" src={"logo2.png"} width={50} height={30} alt="Theme-Logo" />
                                        </i>
                                    </a>
                                    <span style={{ color: "white", paddingLeft: "7px" }}> Almacenes Celaya </span>
                                    {menu ?
                                        <a onClick={ver} style={{ cursor: 'pointer' }}>
                                            <FontAwesomeIcon icon={faChevronRight} style={{ width: "20px", height: "20px" }} />
                                        </a>
                                        :
                                        <a onClick={contraer} style={{ cursor: 'pointer' }}>
                                            <FontAwesomeIcon icon={faBars} style={{ width: "20px", height: "20px" }} />
                                        </a>
                                    }

                                    <br />
                                </div>

                                <div className="navbar-container container-fluid">
                                    <ul className="nav-left">
                                        {//<img src="./files/assets/images/avatar-4.jpg" className="img-radius" alt="User-Profile-Image" />
                                        }
                                        <FontAwesomeIcon icon={faUser} style={{ width: "40px", height: "40px", paddingRight: "20px", marginTop: "10px", paddingLeft: "20px" }} />
                                        
                                        <span style={{ fontSize: "1em" }}>Bienvenido {" "+ usuario.nombre}</span>
                                    </ul>
                                    <ul className="nav-right">


                                        <li className="user-profile header-notification">
                                            <div className="dropdown-primary dropdown">
                                                <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                    <a
                                                        id="cerrar-sesion-a"
                                                        className="dropdown-item"
                                                        style={{ fontSize: "1em", textAlign: "right" }}
                                                        onClick={() => {
                                                            setUsuario1(null);
                                                            sessionStorage.clear();
                                                            window.location.reload();
                                                        }}
                                                    >
                                                        Cerrar sesión
                                                    </a>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>



                        <SideBarDash rol={usuario.rol} />
                    </div>
                </div >
            </>
        )
    }
}
