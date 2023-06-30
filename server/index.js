// 기본설정
const express = require('express'); // express 모듈 가져오기
const app = express(); // function을 이용해서 새로운 express app 만들기
const port = 4000; // 포트는 아무거나 해도 됨 (부딪히지 않으면)

// 옵션 추가
const config = require('./config/key'); //key에서 상황을 받아오기 위해
// const requireTest = require('./requireTest'); // require 테스트
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
})
    .then(() => console.log('Mongo DB Connected...')) // 잘 연결됐는지 확인하기 위해 추가
    .catch(err => console.log(err)); // 에러가 뜨면 그것도 알려주도록 설정


app.get('/api/hello', (req, res) => res.send('헬로 월드! axios axios'));

app.get('/', (req, res) => res.send('axios 테스트~'));


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


app.post('/api/users/login', async (req, res) => {
    try { //요청된 이메일이 DB에 있는지 찾기 
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.json({
            loginSuccess: false,
            message: 'Try another E-mail'
        });

        //요청된 이메일이 DB에 있다면 비밀번호 확인
        const isMatch = await user.comparePassword(req.body.password,
            async (err, isMatch) => {
                if (!isMatch) return res.json({
                    loginSuccess: false,
                    message: "Wrong Password"
                });

                //비밀번호 까지 맞다면 토큰을 생성하기.
                const token = await user.generateToken((err, user) => {
                    res.cookie("x_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true,
                            message: `${user.email} 로그인 되었습니다.`,
                            userId: user._id
                        });
                });
            });
    }
    catch (err) {
        return res.status(400).send(err);
    };
});


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
        role: req.user.role,
        image: req.user.image

        // 이렇게 정보를 주면 어떤 페이지에서든 유저 정보를 이용할 수 있기 때문에 편해진다.
    });
});


app.get('/api/users/logout', auth, (req, res) => { // 로그인된 상태이므로 auth 미들웨어 포함됨

    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }) // 토큰 지워주기 
        .then((user) => {
            return res.status(200).json({ // 이 코드에선 send로 보내줘도 무방 (자동으로 json 반환)
                success: true,
                message: `${user.email} 로그아웃 되었습니다.`
            })
        })
        .catch((err) => {
            // console.error(err);
            return res.json({ success: false, err: err });
        });
});



// app이라는 웹 서버 객체를 port라는 번호에 연결하고, 서버가 실행되면 콘솔에 메시지를 출력하는 함수
// 이 코드를 실행하면 웹 브라우저에서 http://localhost:port 에 접속할 수 있다.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



