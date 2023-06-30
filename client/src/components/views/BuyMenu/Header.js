import React from "react"
import styles from "./Header.module.css"
import { Routes, Route, Link } from "react-router-dom"

const Header = () => {
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

                <div className={styles.navigation}>
                    <p>명륜 / 율전</p>
                </div>
            </div>
        </header>
    )
}


export default Header