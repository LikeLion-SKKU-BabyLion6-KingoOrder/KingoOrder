import React from "react"
import styles from "./Head.module.css"
import { Routes, Route, Link } from "react-router-dom"

const Head = () => {
    return (
        <header className={styles.header}>
            <div>
                <div >
                    <Link to="/menuchoose" className={styles.b}>뒤로 가기</Link>
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


export default Head