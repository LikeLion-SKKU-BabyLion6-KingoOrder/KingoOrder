// 기본설정
const express = require('express'); // express 모듈 가져오기
const app = express(); // function을 이용해서 새로운 express app 만들기
const port = 7654; // 포트는 아무거나 해도 됨

// 옵션 추가
const config = require('./config/key'); //key에서 상황을 받아오기 위해
const requireTest = require('./requireTest'); // require 테스트
const cookieParser = require('cookie-parser'); // cookie-parser 가져오기
const { User } = require("./models/User"); // models 파일에서 유저 모델 가져오기
const { auth } = require("./middleware/auth"); // middleware 파일에서 auth 가져오기

//// body-parser는 이제 express에 기본 탑재. 따로 설치할 필요 X
app.use(express.json()); // application/json 타입 데이터를 분석해서 가져올 수 있도록
app.use(express.urlencoded({ extended: true })); // // application/x-www-form-urlencoded 형태 데이터를 분석해서 가져오도록

app.use(cookieParser()); // cookie-parser 사용 등록

// mongoose 추가
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { // 비밀정보 보호 - key.js의 mongoURI로 대체
    // 에러 방지를 위해 아래줄 추가
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Mongo DB Connected...')) // 잘 연결됐는지 확인하기 위해 추가
    .catch(err => console.log(err)); // 에러가 뜨면 그것도 알려주도록 설정


app.get('/', (req, res) => res.send('헬로 월드!'));
app.get('/api/users/register', (req, res) => res.send(requireTest.registerHello));
app.get('/api/users/login', (req, res) => res.send('Login here!'));

app.post('/api/users/register', async (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다

    const user = new User(req.body)

    await user.save()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.error(err);
            res.json({ success: false, err: err });
        });
});


app.post('/api/users/login',(req, res) =>{
    // 요청된 이메일을 데이터베이스 찾기
    User.findOne({email: req.body.email})
    .then(docs=>{
        if(!docs){
            return res.json({
                loginSuccess: false,
                messsage: "Try another E-mail"})
        }
        // 비밀번호 맞는지 비교하기 (comparePassword 메서드 만들기)
        docs.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                loginSuccess: false, 
                messsage: "Wrong Password"});
            
            // Password가 일치하다면 토큰 생성
            docs.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                // console.log('test');
                
                // 토큰을 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, 
                    userId: user._id})
            })
        })
    })
    .catch((err)=>{
        return res.status(400).send(err);
    })
})

app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해왔다는 얘기는
    // -> Authentication이 True라는 뜻!
    res.status(200).json({
        // 필요한 유저 정보들을 클라이언트에 제공하기
        _id: req.user._id, // auth.js의 req.user 때문에 이 코드가 가능
        isAdmin: req.user.role === 0 ? false : true, // 0이면 false, 아니면 true
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user,role,
        image: req.user.image
    
    // 이렇게 정보를 주면 어떤 페이지에서든 유저 정보를 이용할 수 있기 때문에 편해진다.
    })
})




// app이라는 웹 서버 객체를 port라는 번호에 연결하고, 서버가 실행되면 콘솔에 메시지를 출력하는 함수
// 이 코드를 실행하면 웹 브라우저에서 http://localhost:port 에 접속할 수 있다.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}); 



