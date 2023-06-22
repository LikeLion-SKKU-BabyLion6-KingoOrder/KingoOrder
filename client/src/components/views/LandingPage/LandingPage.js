import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    // useEffect(() => {
    //     // 응답 받은 메시지 콘솔에 찍기
    //     axios.get('/', { headers: { 'Content-Type': 'application/json' } })
    //     .then(response => console.log(response.data)) 
    // }, [])


    useEffect(() => {
        // 응답 받은 메시지 콘솔에 찍기
        axios.get("/")
        .then(response => { console.log(response.data) }) 
    }, [])



    return (
        <div>LandingPage !!~~~~ </div>
    )
}

export default LandingPage