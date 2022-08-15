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


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';

import ArticulosService from '../../services/articulos.service';

import { createRoot } from 'react-dom/client';
import CreateArticulo from "./CreateArticulo";
import imagesService from "../../services/images.service";
import Swal from "sweetalert2";
import EditArticulo from "./EditArticulo";

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export default function ListArticulos() {
    const [articulo, setArticulo] = useState(new Array());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
        ArticulosService.getAll()
            .then(response => {
                var algo = [];
                algo = Array.from(response.data);
                setArticulo(algo);
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

    const crearArticulo = (event) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<CreateArticulo />);
    }

    const editarArticulo = (id) => {
        let container = document.getElementById('page-body-cambio');
        let root = createRoot(container);
        root.render(<EditArticulo id={id} />);
    }


    const getImage = (id, key) => {
        imagesService.get(key)
            .then(response => {
                document.getElementById(id).src = response.data
            })
            .catch(error => { console.log(error); });
    }

    const pdf = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        let date = new Date().toLocaleDateString();
        var columns = ["Código", "Producto", "Descripción","Cantidad en Stock", "Precio Unitario","Caducidad"];

        var data = [];

        for (let i = 0; i < articulo.length; i++) {
            data.push([`${articulo[i].id}`, `${articulo[i].nombre}`,`${articulo[i].descripcion}`, `${articulo[i].cantidadStock}`,`$${articulo[i].precioUnitario}`,
             `LOTE CADUCA ${articulo[i].caducidad ? articulo[i].caducidad.substr(0, 10) : ""}`
            ])
        }
        pdf.setFontSize(16);
        pdf.setFont("Sans-Serif Font")
        pdf.text(65, 20, "Reporte de Articulos al dia " + date);
        pdf.setFont("Serif");
        pdf.setFontSize(12);

        pdf.text(
            `Al dia ${date} se reportan todos los articulos activos y con los que se cuenta inventario`,
            18, 40
        );
        pdf.text(
            `en almacen dentro de la empresa ALMACENES CELAYA, los datos expedidos a continuacion son el`,
            18, 45
        );
        pdf.text(
            `registro de cada articulo que ha entrado en las ultimas semanas hasta el dia de hoy`,
            18, 50
        );
        pdf.autoTable(columns, data,
            { margin: { top: 60 } }
        );

        pdf.save("ReporteArticulos" + date);
    }

    return (

        <div className="card" style={{ background: 'white' }}>
            <div className="card-header">
                <h5>Articulos en Almacen</h5>
                {
                    /*<Fab color="primary" aria-label="add" size="small" style={{ marginLeft: "95%" }}>
                    <FontAwesomeIcon icon={faAdd} />
                </Fab>*/
                }
                <div className="card-header-right"> <ul className="list-unstyled card-option"> <li className="first-opt"><i className="feather icon-chevron-left open-card-option"></i></li> <li><i className="feather icon-maximize full-card"></i></li> <li><i className="feather icon-minus minimize-card"></i></li> <li><i className="feather icon-refresh-cw reload-card"></i></li> <li><i className="feather icon-trash close-card"></i></li> <li><i className="feather icon-chevron-left open-card-option"></i></li> </ul> </div>

            </div>

            <div className="card-block table-border-style">

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Código</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="center">Nombre </StyledTableCell>
                                <StyledTableCell align="center">Descripcion</StyledTableCell>
                                <StyledTableCell align="center">Cantidad</StyledTableCell>
                                <StyledTableCell align="center">Precio</StyledTableCell>
                                <StyledTableCell align="center">Caducidad</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {articulo
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
                                        <TableCell align="center">
                                            <img id={`images${ar.id}`} height="100" width="100" alt="ImagenProducto" />
                                            {getImage(`images${ar.id}`, ar.linkImage)}
                                        </TableCell>
                                        <TableCell align="left">{ar.nombre}</TableCell>
                                        <TableCell align="justify">{ar.descripcion}</TableCell>
                                        <TableCell align="center">{ar.cantidadStock}</TableCell>
                                        <TableCell align="center">{"$ " + ar.precioUnitario}</TableCell>
                                        <TableCell align="center">LOTE CADUCA{"  "}{ar.caducidad ? ar.caducidad.substr(0, 10) : ""}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="secondary" aria-label="add an alarm" style={{ marginRight: 10 }}
                                                onClick={() => {
                                                    let container = document.getElementById('page-body-cambio');
                                                    let root = createRoot(container);
                                                    root.render(<EditArticulo id={ar.id} />);
                                                }}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => {
                                                Swal.fire({
                                                    title: '#' + ar.id + ' ' + ar.nombre,
                                                    text: "¿Desea Eliminarlo?",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonText: "Sí, eliminar",
                                                    cancelButtonText: "Cancelar",
                                                })
                                                    .then(resultado => {
                                                        if (resultado.value) {
                                                            console.log("*se elimina la venta*");
                                                            ArticulosService.delete(ar.id)
                                                                .then(response => {
                                                                    Swal.fire({
                                                                        title: 'Eliminado con exito',
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
                                                            ReactDOM.render(<ListArticulos />, divDash);
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
                    count={articulo.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" endIcon={<FontAwesomeIcon icon={faAdd} />} onClick={crearArticulo}>
                        Agregar
                    </Button>
                    <Button onClick={pdf} color="secondary" variant="contained" endIcon={<FontAwesomeIcon icon={faFilePdf} />}>
                        Generar Reporte PDF
                    </Button>
                </Stack>
            </div>
        </div>


    )

}
