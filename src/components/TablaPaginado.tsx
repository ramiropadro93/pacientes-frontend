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
import styles from "../styles/home.module.css";
import '../helpers/i18n';
import { useTranslation } from "react-i18next";

const TablaPaginado = ({
    patients,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    const [detallePaciente, setDetallePaciente] = useState<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {t} = useTranslation();
    function abrirDetallePaciente(idPaciente: any) {
        const url = API_URL + "/Paciente/GetPacienteDetalleById?id=" + idPaciente;
        getApi(url).then((r: any) => {
            setDetallePaciente(r);
            setIsModalOpen(true);
        }).catch((error: any) => {
            console.log(error);
        });
    }

    return (
        <>
        {patients.length === 0 && <p className={styles["no-pacientes-p"]}>No hay pacientes para mostrar</p>}
        {patients.length > 0 &&
            <>
                <h1 className={styles.titulo}>Listado de pacientes</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Edad</TableCell>
                                <TableCell>Documento</TableCell>
                                <TableCell>Fecha de nacimiento</TableCell>
                                <TableCell>Grupo sanguíneo</TableCell>
                                <TableCell>Tipo de sala</TableCell>
                                <TableCell>Fecha de ingreso</TableCell>
                                <TableCell>Fecha de alta</TableCell>
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
                                        <TableCell>{patient.edad}</TableCell>
                                        <TableCell>{patient.documento}</TableCell>
                                        <TableCell>{patient.fechaNacimiento}</TableCell>
                                        <TableCell>{patient.grupoSanguineo}</TableCell>
                                        <TableCell>{!patient.fechaSalida ? t(EstadoEnum[patient.estado]) : t(EstadoEnum[3])}</TableCell>
                                        <TableCell>{patient.fechaIngreso}</TableCell>
                                        <TableCell>{!patient.fechaSalida ? "-" : patient.fechaSalida}</TableCell>
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
            </>
        }
            {isModalOpen && (
                <div className={styles["modal-overlay"]}>
                    <div className={styles["modal-content"]}>
                        <p className={styles["modal-message"]}>
                            Detalle del paciente
                        </p>
                        <h3>Información personal</h3>
                        <p className={styles["modal-informacion"]}>
                            Nombre: {detallePaciente.nombre}
                        </p>
                        <p className={styles["modal-informacion"]}>
                            Edad: {detallePaciente.edad}
                        </p>
                        <p className={styles["modal-informacion"]}>
                            Documento: {detallePaciente.documento}
                        </p>
                        <p className={styles["modal-informacion"]}>
                            Fecha de nacimiento: {detallePaciente.fechaNacimiento}
                        </p>
                        <p className={styles["modal-informacion"]}>
                            Grupo sanguíneo: {detallePaciente.grupoSanguineo}
                        </p>
                        <h3>Información de atención</h3>
                        <p className={styles["modal-informacion"]}>
                            Fecha de ingreso: {detallePaciente.fechaIngreso}
                        </p>
                        {
                            detallePaciente.fechaSalida &&
                            <>
                                <p className={styles["modal-informacion"]}>
                                    Fecha de alta: {detallePaciente.fechaSalida}
                                </p>
                                <p className={styles["modal-informacion"]}>
                                    Habitación: {t(EstadoEnum[3])}
                                </p>
                            </>
                        }
                        {
                            !detallePaciente.fechaSalida &&
                            <p className={styles["modal-informacion"]}>
                                Habitación: {t(EstadoEnum[detallePaciente.estado])}
                            </p>
                        }
                        <p className={styles["modal-informacion"]}>
                            Doctor encargado: {detallePaciente.doctor}
                        </p>
                        {
                            detallePaciente.medicacion &&
                            <p className={styles["modal-informacion"]}>
                                Medicación: {detallePaciente.medicacion}
                            </p>
                        }
                        {
                            detallePaciente.procedimientos &&
                            <p className={styles["modal-informacion"]}>
                                Procedimientos realizados: {detallePaciente.procedimientos}
                            </p> 
                        }
                        <div className={styles["modal-buttons"]}>
                            <span className={styles["modal-close"]} onClick={() => setIsModalOpen(false)}>
                                Cerrar
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TablaPaginado;
