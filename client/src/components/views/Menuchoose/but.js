import React, { useState } from 'react';
import styles from "./but.module.css";
import { Routes, Route, Link } from "react-router-dom"

const But = () => {

  return (
    <div>
        <button className={styles.b1}>바로구매</button>
        <Link to="/jangbaguni">
        <button className={styles.b2}>장바구니</button>
        </Link>
    </div>
  )
}

export default But