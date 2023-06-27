import React, { useEffect } from 'react';
import axios from 'axios';


function LandingPage() {


    useEffect(() => {
        // 응답 받은 메시지 콘솔에 찍기
        axios.get("/api/hello")
        .then(res => { console.log(res.data) }) 
    }, [])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'}}>
            <h2> Home 화면 </h2>
        </div>
    )
}

export default LandingPage