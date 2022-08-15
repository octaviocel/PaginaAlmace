import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard, faCartShopping, faBarcode } from '@fortawesome/free-solid-svg-icons';
import ListUser from "./usuarios/ListUser";
import ListArticulos from "./articulos/ListArticulos";
import SideBarDashEmpleado from "./SideBarEmpleado";
import ListPedido from "./pedidos/ListPedido";
import InicioAmigable from "./Inicio";

export default function SideBarDash(rol) {

    const obtenerUsuarios = (e) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListUser />);
    }

    const obtenerArticulos = (e) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListArticulos />);
    }

    const obtenerPedidos = (e)=>{
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ListPedido />);
    }

    const InicioFriendly = (e)=>{
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<InicioAmigable />);
    }

    if (rol.rol === 1) {
        return (

            <div className="pcoded-main-container" id="contenedorLarge" style={{ marginTop: "73px" }}>
                <div className="pcoded-wrapper">

                    <nav className="pcoded-navbar" navbar-theme="theme1" id="navegador" active-item-theme="theme1" sub-item-theme="theme2" active-item-style="style0" pcoded-navbar-position="fixed" >
                        <div className="nav-list">
                            <div className="slimScrollDiv" style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}><div className="pcoded-inner-navbar main-menu" style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                <div className="pcoded-navigation-label" menu-title-theme="theme1">Menu </div>
                                <ul className="pcoded-item pcoded-left-item" item-border="true" item-border-style="solid" subitem-border="false">
                                    <li dropdown-icon="style1" subitem-icon="style1">
                                        <a className="waves-effect waves-dark" style={{ cursor: 'pointer' }} onClick={InicioFriendly}>
                                            <span className="pcoded-micon"><i className="feather icon-home"><FontAwesomeIcon icon={faClipboard} /></i></span>
                                            <span className="pcoded-mtext">Inicio</span>
                                        </a>
                                    </li>
                                    <li >
                                        <a className="waves-effect waves-dark" style={{ cursor: 'pointer' }} onClick={obtenerArticulos}>
                                            <span className="pcoded-micon">
                                                <i className="feather icon-menu"><FontAwesomeIcon icon={faBarcode} /></i>
                                            </span>
                                            <span className="pcoded-mtext">Articulos</span>
                                        </a>
                                    </li>
                                    <li >
                                        <a className="waves-effect waves-dark" style={{ cursor: 'pointer' }} onClick={obtenerPedidos}>
                                            <span className="pcoded-micon">
                                                <i className="feather icon-menu"><FontAwesomeIcon icon={faCartShopping} /></i>
                                            </span>
                                            <span className="pcoded-mtext">Pedidos</span>
                                        </a>
                                    </li>
                                    <li >
                                        <a className="waves-effect waves-dark" style={{ cursor: 'pointer' }} onClick={obtenerUsuarios}>
                                            <span className="pcoded-micon">
                                                <i className="feather icon-menu"><FontAwesomeIcon icon={faUser} /></i>
                                            </span>
                                            <span className="pcoded-mtext">Empleados</span>
                                        </a>
                                    </li>

                                </ul>

                            </div><div className="slimScrollBar" style={{ background: "rgb(0, 0, 0)", width: "5px", position: "absolute", top: "0px", opacity: "0.4", display: "none", borderRadius: "7px", zIndex: 99, right: "1px", height: "867px" }}></div><div className="slimScrollRail" style={{ width: "5px", height: "100%", position: "absolute", top: "0px", display: "none", borderRadius: "7px", background: "rgb(51, 51, 51)", opacity: "0.2", zIndex: 90, right: "1px" }}></div></div>
                        </div>
                    </nav>

                    <div className="pcoded-content" id="contenedorgrande" >

                        <div className="page-header card">
                            <div className="row align-items-end">
                                <div className="col-lg-8">
                                    <div className="page-header-title">
                                        <i className="feather icon-home bg-c-blue"><FontAwesomeIcon icon={faClipboard} /></i>
                                        <div className="d-inline">
                                            <h5>LAHC</h5>
                                            <span>Logística Almacenes Hermanos Celaya</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="page-header-breadcrumb">
                                        <ul className=" breadcrumb breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="index.html"><i className="feather icon-home"></i></a>
                                            </li>
                                            <li className="breadcrumb-item"><a href="#!">Panel De Administraci&oacute;n</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pcoded-inner-content">
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <div className="page-body" id="page-body-cambio">

                                        {
                                            /*
                                            AQUI VA TODO EL BODYYYYYYYY
                                            */
                                        }
                                        <InicioAmigable></InicioAmigable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div >
        )

    } else {
        return (
            <>
                <SideBarDashEmpleado />
            </>
        )
    }

}