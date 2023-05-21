import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.li}>
          <Link href="/">
            Listado pacientes
          </Link>
        </li>
        <li className={styles.li}>
          <Link href="/agregar-paciente">
            Agregar paciente
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;