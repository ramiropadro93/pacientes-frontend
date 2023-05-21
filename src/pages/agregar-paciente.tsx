import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "../styles/agregar-paciente.module.css";
import { API_URL } from "../config/constants";
import { postApi } from "../helpers/ApiUtility";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import moment from "moment";
import { useTranslation } from "react-i18next";
import '../helpers/i18n';

const AgregarPaciente = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fechaNacimientoElegida, setFechaNacimientoElegida] = useState(null);
    const {t} = useTranslation();
    const DatePickerWrapper = styled(DatePicker)`
        width: 98%;
        height: 23px;
    `;

    type PatientFormData = {
        nombre: string;
        edad: number;
        documento: string;
        grupoSanguineo: string;
        email: string;
        motivoIngreso: string;
        estado: number;
        genero: number;
        fechaNacimiento: string;
        procedimientos: string;
        medicacion: string;
        doctor: string;
    };

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<PatientFormData>();

    const onSubmit: SubmitHandler<PatientFormData> = (data) => {
        
        const fechaN = moment(data.fechaNacimiento).format('DD/MM/YYYY');
        const url = API_URL + "/Paciente/AddOrUpdatePaciente";
        const body = {
            Nombre: data.nombre,
            Edad: data.edad,
            Documento: data.documento,
            Email: data.email,
            GrupoSanguineo: data.grupoSanguineo,
            MotivoIngreso: data.motivoIngreso,
            Estado: data.estado,
            Genero: data.genero,
            FechaNacimiento: fechaN,
            Doctor: data.doctor,
            Medicacion: data.medicacion,
            Procedimientos: data.procedimientos
        };

        postApi(url, body)
            .then((r: any) => {
                setIsModalOpen(true);
                reset();
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isModalOpen) {
            timer = setTimeout(() => {
                setIsModalOpen(false);
            }, 3000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isModalOpen]);

    return (
        <div>
            <Navbar />
            <h1 className={styles["titulo-formulario"]}>
                Formulario de ingreso de paciente
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles["form-container"]}
            >
                <div className={styles["form-field"]}>
                    <label htmlFor="nombre" className={styles["form-label"]}>
                        Nombre completo*
                    </label>
                    <input
                        type="text"
                        {...register("nombre", { required: true })}
                        id="nombre"
                        className={styles["form-input"]}
                    />
                    {errors.nombre && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label htmlFor="edad" className={styles["form-label"]}>
                        Edad*
                    </label>
                    <input
                        type="number"
                        {...register("edad", { required: true })}
                        id="edad"
                        className={styles["form-input"]}
                    />
                    {errors.edad && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label htmlFor="genero" className={styles["form-label"]}>
                        Género
                    </label>
                    <select
                        {...register("genero", { required: true })}
                        id="genero"
                        className={styles["select-input"]}
                    >
                        <option value={0}>Seleccione una opción</option>
                        <option value={1}>Masculino</option>
                        <option value={2}>Femenino</option>
                        <option value={3}>Otro</option>
                    </select>
                    {errors.genero && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label htmlFor="documento" className={styles["form-label"]}>
                        Documento*
                    </label>
                    <input
                        type="text"
                        {...register("documento", { required: true })}
                        id="documento"
                        className={styles["form-input"]}
                    />
                    {errors.documento && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label
                        htmlFor="fechaNacimiento"
                        className={styles["form-label"]}
                    >
                        Fecha de nacimiento*
                    </label>
                    <Controller
                        control={control}
                        name={"fechaNacimiento"}
                        rules={{
                            required: {
                                value: true,
                                message: "",
                            },
                            onChange: (e) => {
                                const { value } = e.target;
                                setFechaNacimientoElegida(value);
                            },
                        }}
                        render={({ field }) => (
                            <DatePickerWrapper
                                strictParsing
                                locale="es"
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="dd/MM/yyyy"
                                id="fechaNacimiento"
                            />
                        )}
                    />
                    {errors.fechaNacimiento && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label
                        htmlFor="grupoSanguineo"
                        className={styles["form-label"]}
                    >
                        Grupo Sanguíneo*
                    </label>
                    <input
                        type="text"
                        {...register("grupoSanguineo", { required: true })}
                        id="grupoSanguineo"
                        className={styles["form-input"]}
                    />
                    {errors.grupoSanguineo && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label
                        htmlFor="motivoIngreso"
                        className={styles["form-label"]}
                    >
                        Motivo de ingreso*
                    </label>
                    <input
                        type="text"
                        {...register("motivoIngreso", { required: true })}
                        id="motivoIngreso"
                        className={styles["form-input"]}
                    />
                    {errors.motivoIngreso && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label htmlFor="estado" className={styles["form-label"]}>
                        Tipo de habitación*
                    </label>
                    <select
                        {...register("estado", { required: true })}
                        id="estado"
                        className={styles["select-input"]}
                    >
                        <option value={0}>Seleccione una opción</option>
                        <option value={1}>{t("TerapiaIntensiva")}</option>
                        <option value={2}>{t("SalaComun")}</option>
                    </select>
                    {errors.estado && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label
                        htmlFor="doctor"
                        className={styles["form-label"]}
                    >
                        Doctor*
                    </label>
                    <input
                        type="text"
                        {...register("doctor")}
                        id="doctor"
                        className={styles["form-input"]}
                    />
                    {errors.doctor && (
                        <span className={styles["error-message"]}>
                            Este campo es requerido
                        </span>
                    )}
                </div>
                <div className={styles["form-field"]}>
                    <label
                        htmlFor="procedimientos"
                        className={styles["form-label"]}
                    >
                        Procedimientos
                    </label>
                    <input
                        type="text"
                        {...register("procedimientos")}
                        id="procedimientos"
                        className={styles["form-input"]}
                    />
                </div>
                <div className={styles["form-field"]}>
                    <label
                        htmlFor="medicacion"
                        className={styles["form-label"]}
                    >
                        Medicación
                    </label>
                    <input
                        type="text"
                        {...register("medicacion")}
                        id="medicacion"
                        className={styles["form-input"]}
                    />
                </div>
                <div className={styles["submit-button-container"]}>
                    <button type="submit" className={styles["submit-button"]}>
                        Registrar paciente
                    </button>
                </div>
            </form>
            {isModalOpen && (
                <div className={styles["modal-overlay"]}>
                    <div className={styles["modal-content"]}>
                        <p className={styles["modal-message"]}>
                            Paciente registrado con éxito.
                        </p>
                        <span
                            className={styles["modal-close"]}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cerrar
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgregarPaciente;
