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

import { Button, Stack } from "@mui/material";

import TablePagination from '@mui/material/TablePagination';

import IconButton from '@mui/material/IconButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd,faFilePdf } from '@fortawesome/free-solid-svg-icons';

import { createRoot } from 'react-dom/client';
import UsuarioService from "../../services/usuario.service";
import CreateUser from "./CreateUser";

import Swal from "sweetalert2";
import EditUser from "./EditUser";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export default function ListUser() {
    const [usuario, setUsuario] = useState(new Array());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    React.useEffect(() => {
        UsuarioService.getAll()
            .then(response => {
                let algo = [];
                //console.log(response.data);
                algo = Array.from(response.data);
                //console.log(algo);
                setUsuario(algo);
                //console.log(usuario);
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

    const createUser = () => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<CreateUser />);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const pdf = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        let date = new Date().toLocaleDateString();
        var columns = ["Código de Empleado", "Nombres", "Apellido Paterno","Apellido Materno", "Dirección","Telefono", "Correo",  "RFC"];

        var data = [];

        for (let i = 0; i < usuario.length; i++) {
            data.push([`${usuario[i].id}`, `${usuario[i].nombre}`, `${usuario[i].apePat}`,`${usuario[i].apeMat}`, `${usuario[i].direccion}`,
            `${usuario[i].telefono}`,`${usuario[i].email}`, `${usuario[i].rfc}`
            ])
        }
        pdf.setFontSize(16);
        pdf.setFont("Sans-Serif Font")
        pdf.text(65, 20, "Reporte de Usuarios al dia " + date);
        pdf.setFont("Serif");
        pdf.setFontSize(12);

        pdf.text(
            `Al dia ${date} se reportan todos los usuarios activos en la empresa ALMACENES CELAYA`,
            18, 40
        );
        pdf.text(
            `y por el cual me permito informar de todos sus datos personales recabados por la empresa `,
            18, 45
        );
        pdf.text(
            `y los cuales se les da el trato de confidencialidad mencionado en el respectivo contrato`,
            18, 50
        );
        pdf.text(
            `de cada empleado.`,
            18, 55
        );
        pdf.autoTable(columns, data,
            { margin: { top: 65 } }
        );
        /*autoTable(pdf, {
            head: [columns],
            body: data
        })*/

        pdf.save("ReporteUsuarios" + date);
    }


    return (

        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Empleados en Almacen</h5>

                <div className="card-header-right"> <ul className="list-unstyled card-option"> <li className="first-opt"><i className="feather icon-chevron-left open-card-option"></i></li> <li><i className="feather icon-maximize full-card"></i></li> <li><i className="feather icon-minus minimize-card"></i></li> <li><i className="feather icon-refresh-cw reload-card"></i></li> <li><i className="feather icon-trash close-card"></i></li> <li><i className="feather icon-chevron-left open-card-option"></i></li> </ul> </div>
            </div>
            <div className="card-block table-border-style">

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell align="center">Nombre (s)</StyledTableCell>
                                <StyledTableCell align="center">Apellidos</StyledTableCell>
                                <StyledTableCell align="center">Direccion</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">RFC</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuario
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((usu) => (
                                    <TableRow
                                        key={usu.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover role="checkbox"
                                        tabIndex={-1}
                                    >
                                        <TableCell component="th" scope="row">
                                            {usu.id}
                                        </TableCell>
                                        <TableCell align="left">{usu.nombre}</TableCell>
                                        <TableCell align="left">{usu.apePat + "  " + usu.apeMat}</TableCell>
                                        <TableCell align="left">{usu.direccion}</TableCell>
                                        <TableCell align="left">{usu.email}</TableCell>
                                        <TableCell align="left">{usu.rfc}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="secondary" aria-label="add an alarm" style={{ marginRight: 10 }}
                                                onClick={() => {
                                                    let container = document.getElementById('page-body-cambio');
                                                    let root = createRoot(container);
                                                    root.render(<EditUser id={usu.id} />);
                                                }}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => {
                                                Swal.fire({
                                                    title: '#' + usu.id + ' ' + usu.nombre,
                                                    text: "¿Desea Eliminarlo? \nUna vez eliminado no se pueden desaser los cambios",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonText: "Sí, eliminar",
                                                    cancelButtonText: "Cancelar",
                                                })
                                                    .then(resultado => {
                                                        if (resultado.value) {
                                                            UsuarioService.delete(usu.id)
                                                                .then(response => {
                                                                    Swal.fire({
                                                                        title: 'Usuario Eliminado con Exito',
                                                                        icon: 'success',
                                                                        text: 'Eliminado Correctamente'
                                                                    })
                                                                })
                                                                .catch(err => {
                                                                    Swal.fire({
                                                                        title: 'Error al Eliminar',
                                                                        icon: 'error',
                                                                        text: err
                                                                    })
                                                                })
                                                            let divDash = document.getElementById('page-body-cambio');
                                                            if (divDash.children.length > 0) {
                                                                ReactDOM.unmountComponentAtNode(divDash);
                                                            }
                                                            ReactDOM.render(<ListUser />, divDash);
                                                        }
                                                    })
                                            }
                                            } >
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
                    count={usuario.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" endIcon={<FontAwesomeIcon icon={faAdd} />} onClick={createUser}>
                        Agregar
                    </Button>
                    <Button onClick={pdf} color="secondary" variant="contained" endIcon={<FontAwesomeIcon icon={faFilePdf} />}>
                        Generar Reporte PDF
                    </Button>
                </Stack>
            </div>
        </div >


    )

}
