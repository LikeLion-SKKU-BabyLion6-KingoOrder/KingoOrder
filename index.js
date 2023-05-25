const express = require('express') // express 모듈 가져오기
const app = express() // function을 이용해서 새로운 express app 만들기
const port = 7654; // 포트는 아무거나 해도 됨
const config = require('./config/key'); //key에서 상황을 받아오기 위해
const requireTest = require('./requireTest'); // require 테스트
const cookieParser = require('cookie-parser'); // cookie-parser 가져오기
const { User } = require("./models/User");

//// body-parser는 이제 express에 기본 탑재. 따로 설치할 필요 X
// application/json 타입 데이터를 분석해서 가져올 수 있도록
app.use(express.json());
// application/x-www-form-urlencoded 형태 데이터를 분석해서 가져오도록
app.use(express.urlencoded({ extended: true })); // (10강 기준) extemded 오타있었는데 문제없었음..

app.use(cookieParser()); // cookie-parser 사용 등록

// mongoose 추가
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { // 비밀정보 보호 - key.js의 mongoURI로 대체
    // 에러 방지를 위해 아래줄 추가
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Mongo DB Connected...')) // 잘 연결됐는지 확인하기 위해 추가
    .catch(err => console.log(err)); // 에러가 뜨면 그것도 알려주도록 설정


app.get('/', (req, res) => res.send('헬로 월드!'));
app.get('/register', (req, res) => res.send(requireTest.sayHello));

app.post('/register', async (req, res) => {
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


app.post('/login', (req, res) => {
    // 1. 요청된 이메일을 DB에서 검색
    User.findOne({ email: req.body.email })
        .then(docs => {
            if (!docs) return res.json({
                loginSuccess: false,
                message: "Try another E-mail"
            })

            // 2. (이메일이 있다면) 비밀번호 확인
            docs.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) return res.json({ 
                    loginSuccess: false, 
                    message: "Wrong Password" 
                })

                // 3. (비밀번호 일치한다면) 토큰 생성
                docs.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);

                    // (토큰이 생성됐다면) 토큰을 저장
                    res.cookie("x_auth", user.token)
                        .status(200)
                        .json({ 
                            loginSuccess: true, 
                            userId: user._id })
                })
            })
        })
        .catch((err) => {
            return res.status(400).send(err);
        })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});  // xxxx번 포트에서 이 앱을 실행


