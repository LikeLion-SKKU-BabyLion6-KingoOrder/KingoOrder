import './App.css';
import * as React from "react";
import { 
  BrowserRouter as Router, // Router: 라우팅을 가능케 함
  Routes, // URL과 일치하는 Route 컴포넌트를 찾아서 렌더링
  Route, // 
  Link // 클릭하면 다른 URL로 이동
} from "react-router-dom";
// Link 는 URL 을 변경하고, Route 는 element 에 해당하는 컴포넌트를 렌더링
// Link 와 Route 는 서로 상호작용하며, 라우팅을 구현

// 컴포넌트들 불러오기
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';


function App() {
  return (
    <Router>
      <div>
        <ul> 
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">로그인 페이지</Link></li>
          <li><Link to="/register">회원가입 페이지</Link></li>
        </ul>
      </div>
      
      <div>
        <Routes>
          <Route exact path="/" element = {<LandingPage />} />
          <Route exact path="/login" element = {<LoginPage />} />
          <Route exact path="/register" element = {<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

