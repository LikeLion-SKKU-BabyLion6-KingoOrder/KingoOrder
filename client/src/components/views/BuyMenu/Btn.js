import React from "react"
import styles from "./Btn.module.css"
import { Routes, Route, Link } from "react-router-dom"

const Btn = () => {
    return (
        <div className={styles.btn}>
                <p className={styles.btn1}>식권구매</p>
                <p className={styles.line}></p>
                <p className={styles.btn1}>전체메뉴</p>
                <p className={styles.line}></p>
                <Link to = "/jangbaguni">
                <p className={styles.btn1}>장바구니</p>
                </Link>
                <p className={styles.line}></p>
                <Link to = "/fin">
                    <p className={styles.btn1}>MY식권</p>
                </Link>
            </div>
    )
}

export default Btn