import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import TablaPaginado from '../components/TablaPaginado';
import styles from '../styles/home.module.css';
import { getApi } from '../helpers/ApiUtility';
import {API_URL } from '../config/constants';
import { ThemeProvider, createTheme } from '@mui/material';
import { esES } from '@mui/material/locale';

const PatientsListPage = () => {  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patients, setPatients] = useState<any>([]);
  const theme = createTheme({}, esES);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function obtenerPacientes(): any {
    const url = API_URL + '/Paciente/GetPacientes';

    getApi(url).then((r: any) => {
      console.log(r);
      setPatients(r);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  useEffect(() => {
    obtenerPacientes();
  }, [])
  

  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <h1 className={styles.titulo}>Listado de pacientes</h1>
      <ThemeProvider theme={theme}>
        <TablaPaginado 
          patients={patients}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ThemeProvider>
      </div>
    </>
  );
};

export default PatientsListPage;