import axios from 'axios';
import {
    LOGIN_USER
} from './types'


export function loginUser(dataToSubmit) {
    // 주소는 서버와 맞춰야 함
    const request = axios.post('/api/users/login', dataToSubmit) 
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request 
    }
}

