import React from "react"
import styles from "./hd.module.css"
import { Routes, Route, Link } from "react-router-dom"

const Hd = () => {
    return (
        <header className={styles.header}>
            <div>
                <div >
                    <Link to="/buymenu" className={styles.b}>뒤로 가기</Link>
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


export default Hd