import React from "react"
import styles from "./H.module.css"
import { Routes, Route, Link } from "react-router-dom"

const H = () => {
    return (
        <header className={styles.header}>
            <div>
                <div >
                    <Link to="/" className={styles.logout}>LOG OUT</Link>
                </div>
                
                <Link to="/buymenu">
                    <div className={styles.main}>
                        <h4>킹고오더</h4>
                    </div>
                </Link>

            </div>
        </header>
    )
}


export default H