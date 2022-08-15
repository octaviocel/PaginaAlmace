import React, { useState } from "react";
import ReactDOM from "react-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TablePagination from '@mui/material/TablePagination';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Chip } from "@mui/material";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash, faCheck, faExclamation, faFilePdf } from '@fortawesome/free-solid-svg-icons';

import PedidoService from '../../services/pedido.service';

import { createRoot } from 'react-dom/client';
import Swal from "sweetalert2";
import CreatePedido from './CreatePedido';
import ViewPedido from "./ViewPedido";
import pedidoService from "../../services/pedido.service";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';


export default function ListPedido({ rol }) {
    const [pedidos, setPedidos] = useState(new Array());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    React.useEffect(() => {
        PedidoService.getAll()
            .then(response => {
                var algo = [];
                algo = Array.from(response.data);
                setPedidos(algo);
            }
            )
            .catch(e => {
                console.log(e);
            });
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const crearPedido = (event) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<CreatePedido />);
    }

    const verPedido = (id) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<ViewPedido id={id} />);
    }

    const pdf = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        let date = new Date().toLocaleDateString();
        var columns = ["Código", "Descripción", "Número de productos", "Precio Total", "Fecha de Pedido", "Fecha de Entrega", "Estatus"];

        var data = [];

        for (let i = 0; i < pedidos.length; i++) {
            data.push([`${pedidos[i].id}`, `${pedidos[i].descripcion}`, `${pedidos[i].cantidadProductos}`, `$${pedidos[i].precio}`,
            `${pedidos[i].fechaPedido ? pedidos[i].fechaPedido.substr(0, 10) : ""}`,
            `${pedidos[i].status ? pedidos[i].fechaEntrega : "No se ha entregado aun"}`
                , `${pedidos[i].status ? "Entrega Completada" : "Sin Entregar"}`])
        }
        pdf.setFontSize(16);
        pdf.setFont("Sans-Serif Font")
        pdf.text(65, 20, "Reporte de Pedidos al dia " + date);
        pdf.setFont("Serif");
        pdf.setFontSize(12);

        pdf.text(
            `Al dia ${date} los pedidos se reportan en una tabla donde se puede observar su estado, ademas de`,
            18, 40
        );
        pdf.text(
            `ver los montos con los cuales se han llevado acabo.`,
            18, 45
        );
        pdf.autoTable(columns, data,
            { margin: { top: 55 } }
        );
        /*autoTable(pdf, {
            head: [columns],
            body: data
        })*/

        pdf.save("ReportePedidos" + date);
    }


    return (

        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Pedidos en Almacen</h5>

                <div className="card-header-right"> <ul className="list-unstyled card-option"> <li className="first-opt"><i className="feather icon-chevron-left open-card-option"></i></li> <li><i className="feather icon-maximize full-card"></i></li> <li><i className="feather icon-minus minimize-card"></i></li> <li><i className="feather icon-refresh-cw reload-card"></i></li> <li><i className="feather icon-trash close-card"></i></li> <li><i className="feather icon-chevron-left open-card-option"></i></li> </ul> </div>

            </div>

            <div className="card-block table-border-style">

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Código Pedido</StyledTableCell>
                                <StyledTableCell align="center">Descripcion</StyledTableCell>
                                <StyledTableCell align="center">N&uacute;mero de productos</StyledTableCell>
                                <StyledTableCell align="center">Precio</StyledTableCell>
                                <StyledTableCell align="center">Fecha de Pedido</StyledTableCell>
                                <StyledTableCell align="center">Fecha de Entregada</StyledTableCell>
                                <StyledTableCell align="center">Estatus</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pedidos
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((ar) => (
                                    <TableRow
                                        key={ar.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover role="checkbox"
                                        tabIndex={-1}
                                    >
                                        <TableCell component="th" scope="row">
                                            {ar.id}
                                        </TableCell>
                                        <TableCell align="justify">{ar.descripcion}</TableCell>
                                        <TableCell align="center">{ar.cantidadProductos}</TableCell>
                                        <TableCell align="center">{"$ " + ar.precio}</TableCell>
                                        <TableCell align="center">{ar.fechaPedido ? ar.fechaPedido.substr(0, 10) : ""}</TableCell>
                                        <TableCell align="center">{ar.status ?
                                            ar.fechaEntrega
                                            :
                                            "No se ha entregado aun"
                                        }</TableCell>
                                        <TableCell align="center">{ar.status ?
                                            <Chip icon={<FontAwesomeIcon icon={faCheck} style={{ padding: 10 }} />} label="Entrega Completa" variant="outlined" color="success" />
                                            :
                                            <Chip icon={<FontAwesomeIcon icon={faExclamation} style={{ padding: 10 }} />} label="Sin Entregar" variant="outlined" color="error" />
                                        } </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => {
                                                verPedido(ar.id)
                                            }}
                                                color="primary" aria-label="add an alarm" style={{ marginRight: 10 }}
                                            >
                                                <h6>Ver pedido</h6>
                                            </IconButton>
                                            {ar.status ?
                                                <></>
                                                :
                                                <IconButton onClick={() => {
                                                    const data = {
                                                        fechaEntrega: new Date().toLocaleString(),
                                                        status: true
                                                    }
                                                    pedidoService.update(ar.id, data)
                                                        .then(response => {
                                                            Swal.fire({
                                                                title: 'Completado con exito',
                                                                icon: 'success',
                                                                text: 'Completado Correctamente'
                                                            })
                                                            let divDash = document.getElementById('page-body-cambio');
                                                            if (divDash.children.length > 0) {
                                                                ReactDOM.unmountComponentAtNode(divDash);
                                                            }
                                                            ReactDOM.render(<ListPedido />, divDash);
                                                        })
                                                        .catch(err => {
                                                            Swal.fire({
                                                                title: 'Error al completar',
                                                                icon: 'error',
                                                                text: err
                                                            })
                                                        })
                                                    //console.log(new Date().toLocaleString());
                                                }}
                                                    color="secondary" aria-label="add an alarm" style={{ marginRight: 10 }}
                                                >
                                                    <h6>Completar</h6>
                                                </IconButton>
                                            }
                                            <IconButton aria-label="delete" onClick={() => {
                                                Swal.fire({
                                                    title: '#' + ar.id + ' ' + ar.descripcion,
                                                    text: "¿Desea Cancelar el Pedido?",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonText: "Sí, Cancelar",
                                                    cancelButtonText: "No",
                                                })
                                                    .then(resultado => {
                                                        if (resultado.value) {
                                                            PedidoService.delete(pedidos.id)
                                                                .then(response => {
                                                                    Swal.fire({
                                                                        title: 'Cancelado con exito',
                                                                        icon: 'success',
                                                                        text: 'Cancelado Correctamente'
                                                                    })
                                                                })
                                                                .catch(err => {
                                                                    Swal.fire({
                                                                        title: 'Error al cancelar',
                                                                        icon: 'error',
                                                                        text: err
                                                                    })
                                                                })
                                                            let divDash = document.getElementById('page-body-cambio');
                                                            if (divDash.children.length > 0) {
                                                                ReactDOM.unmountComponentAtNode(divDash);
                                                            }
                                                            ReactDOM.render(<ListPedido />, divDash);
                                                        } else {
                                                        }
                                                    });
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                    component="div"
                    count={pedidos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <Stack direction="row" spacing={2}>
                    <Button onClick={crearPedido} variant="contained" endIcon={<FontAwesomeIcon icon={faAdd} />}>
                        Agregar
                    </Button>
                    {
                        <Button onClick={pdf} color="secondary" variant="contained" endIcon={<FontAwesomeIcon icon={faFilePdf} />}>
                            Generar PDF
                        </Button>
                       
                    }
                </Stack>
            </div>
        </div>


    )

}
