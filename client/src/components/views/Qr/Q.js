import React, { useState } from 'react';
import styles from "./Q.module.css";
import qr from "./큐알.JPG"

const Q = () => {
  return (
    <div>
        <div className={styles.back}></div>
        <div className={styles.when}>
            2023.07.01
        </div>
        <div className={styles.atc}>
            <div className={styles.card1}>
                <img src={qr}/>
            </div>
        </div>
            <div className={styles.m}>
                (면가) 볶음우동
            </div>
        
    </div>
  )
}

export default Q;