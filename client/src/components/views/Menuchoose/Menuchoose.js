import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import Hd from './hd'
import Choose from "./choose"
import But from "./but"



const Menuchoose = () => {
    return (
        <div>
            <Hd />
            <Choose/>
            <But />
        </div>
        )
    }

export default Menuchoose