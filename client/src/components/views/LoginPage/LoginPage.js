import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_action/user_action';

function LoginPage() {
  const dispatch = useDispatch();

  // 서버에 보내고자 하는 값들을 이 state에 갖고있는 것
  const [Email, setEmail] = useState("") // ""는 처음 상태를 빈 string으로 하겠다는 뜻 
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => { // 함수 이름은 임의로 지정 가능 
    setEmail(event.currentTarget.value) // setEmail을 이용해서 state 바꿔주기
  }

  const onPasswordHandler = (event) => { // 함수 이름은 임의로 지정 가능 
    setPassword(event.currentTarget.value)
  }
  
  const onSubmitHandler = (event) => { // 함수 이름은 임의로 지정 가능 
    event.preventDefault(); // 버튼 누를 때마다 페이지 refresh 되는 거 방지

    // 잘 찍히는지 확인
    console.log('Email: ', Email)
    console.log('Password: ', Password)

    // 서버에 body 만들어서 보내기
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body)) 


  }
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '100%', height: '100vh'}}>

      <form style={{ display:'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler} > 
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} /> 
        <br />
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    
    </div>
  )
}

export default LoginPage