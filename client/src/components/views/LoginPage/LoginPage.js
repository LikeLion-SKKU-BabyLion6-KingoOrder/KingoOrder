import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_action/user_action';
import styles from "./LoginPage.module.css"

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 리다이렉션을 위해 

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
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/buymenu')
        } else {
          alert('아이디 혹은 패스워드가 틀렸습니다')
        }
      })
 
  }


  return (
    <div>
      <div className={styles.page}>
        <div className={styles.titleWrap1}>
          킹고오더
        </div>
        <div className={styles.titleWrap2}>
          이메일과 비밀번호를 입력해주세요.
        </div>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>

        <div className={styles.contentWrap}>
          <label className={styles.inputTitle}>이메일</label><br />
          <div className={styles.inputWrap} >
            <input className={styles.input} type='email' value={Email} onChange={onEmailHandler} placeholder="test@gmail.com" /><br />
          </div>
        </div>

        <div className={styles.contentWrap2}>
          <label style={{ marginTop: "26px" }} className={styles.inputTitle}>비밀번호</label><br />
            <div className={styles.inputWrap} >
          <input className={styles.input} type='password' value={Password} onChange={onPasswordHandler} placeholder="영문, 숫자, 특수문자 포함 8자 이상"/><br />
          </div>
        </div>

        
        
            <button className={styles.bottomButton} type="submit">
                확 인
            </button>
            

      </form>

    </div>
  )
}

export default LoginPage