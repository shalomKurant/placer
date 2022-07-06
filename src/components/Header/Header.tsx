import React, { FC } from 'react';
import styles from './Header.module.css';
import logo from "../../images/nasa-logo.svg";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className={styles.Header}>
    <img className={styles.Logo} src={logo}></img>
    Meteors
  </div>
);

export default Header;
