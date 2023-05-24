const express = require('express') // express 모듈 가져오기
const app = express() // function을 이용해서 새로운 express app 만들기
const port = 7654; // 포트는 아무거나 해도 됨
const { User } = require("./models/User");

const config = require('./config/key');

//// body-parser는 이제 express에 기본 탑재. 따로 설치할 필요 X
// application/json 타입 데이터를 분석해서 가져올 수 있도록
app.use(express.json());
// application/x-www-form-urlencoded 형태 데이터를 분석해서 가져오도록
app.use(express.urlencoded({extemded: true}));


// mongoose 추가
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
// 에러 방지를 위해 아래줄 추가
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Mongo DB Connected...')) // 잘 연결됐는지 확인하기 위해 추가
.catch(err => console.log(err)); // 에러가 뜨면 그것도 알려주도록 설정


app.get('/', (req, res) => res.send('헬로 월드!'));
app.get('/register', (req, res) => res.send('register 페이지!'));

app.post('/register', async(req, res) => { 
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});  // xxxx번 포트에서 이 앱을 실행




