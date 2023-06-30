import React from "react"
import styles from "./Total.module.css"
import { Routes, Route, Link } from "react-router-dom"

const Total = () => {
    return (
        <div>
            <div className={styles.bar}></div>
            <Link to="/fin">
                <button className={styles.fin}>구매하기</button>
            </Link>
        </div>
    )
}

export default Total