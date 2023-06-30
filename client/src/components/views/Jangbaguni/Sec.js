import React, {useState, useEffect} from "react"
import styles from "./Sec.module.css"
import { Routes, Route, Link } from "react-router-dom"
import img4 from "./면가_1.png"


const Sec = () => {

    const [value, setValue] = useState(2);
    const [sum, setSum] = useState(0);
    useEffect (() => { const calculatedPrice = ( value * 5500 ); setSum(calculatedPrice)}, [value]);


    return (
        <div>

        <div className={styles.b}></div>

            <div className={styles.container1}>

                        <div className={styles.atc}>
                            <div className={styles.card1}>
                                <img src={img4}/>
                            </div>
                        </div>

                        <div className={styles.m}>
                            <p>(면가) 볶음우동</p>
                        </div>

                        
                        <div className={styles.value}>
                            <button className={styles.value1} onClick={() => setValue(value - 1)} >-</button>
                            {value}개
                            <button className={styles.value2} onClick={() => setValue(value + 1)}>+</button>
                        </div>

                        <div className={styles.sum}>총 {sum}원 </div>




            </div>

        </div>
    )
}



export default Sec;