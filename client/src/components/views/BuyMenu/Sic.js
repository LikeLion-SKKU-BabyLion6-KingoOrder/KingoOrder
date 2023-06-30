import React from "react"
import styles from "./Sic.module.css"
import { Routes, Route, Link } from "react-router-dom"

const Sic = () => {
    return (
        <div className={styles.sic}>
            <button className={styles.sic1}>금잔디식당</button>
            <button className={styles.sic2}>옥류천식당</button>
        </div>
    
    )
}

export default Sic