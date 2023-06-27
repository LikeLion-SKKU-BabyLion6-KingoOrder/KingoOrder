import {
    LOGIN_USER
} from '../_action/types';


export default function (state = {}, action) {
    // 많은 type을 다루기 위해 switch 사용
    switch (action.type){ 
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break
        
        default: 
            return state; 
    } 


}

