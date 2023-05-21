import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";
import { EstadoEnum } from "../models/EstadoEnum";
import { API_URL } from "../config/constants";
import { getApi } from "../helpers/ApiUtility";
import { useState } from "react";

const TablaPaginado = ({
    patients,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    const [detallePaciente, setDetallePaciente] = useState<any>({});
    function abrirDetallePaciente(idPaciente: any) {
        console.log('idPaciente: ', idPaciente);
        const url = API_URL + "/Paciente/AbrirDetalle?id=" + idPaciente;
        getApi(url).then((r: any) => {
            setDetallePaciente(r);
        }).catch((error: any) => {
            console.log(error);
        });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Edad</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Fecha de nacimiento</TableCell>
                        <TableCell>Fecha de ingreso</TableCell>
                        <TableCell>Grupo sanguíneo</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((patient: any, index: number) => (
                            <TableRow key={patient.id} onClick={(evt: any) => abrirDetallePaciente(patient.id)} style={{cursor: 'pointer'}}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{patient.nombre}</TableCell>
                                <TableCell>{patient.fechaNacimiento}</TableCell>
                                <TableCell>{patient.documento}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                                <TableCell>{patient.fechaIngreso}</TableCell>
                                <TableCell>{patient.grupoSanguineo}</TableCell>
                                <TableCell>{EstadoEnum[patient.estado]}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={patients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default TablaPaginado;
