const express = require('express') // express 모듈 가져오기
const app = express() // function을 이용해서 새로운 express app 만들기
const port = 3456 // 포트는 아무거나 해도 되는데, 우리는 3000번 포트 쓰자

// mongoose 추가
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://juyeongkim201:qwer1234@testcluster230519.hmgwxfk.mongodb.net/?retryWrites=true&w=majority', {
// 에러 방지를 위해 아래줄 추가
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, userFindAndModify: false
}).then(() => console.log('Mongo DB Connected...')) // 잘 연결됐는지 확인하기 위해 추가
.catch(err => console.log(err)) // 에러가 뜨면 그것도 알려주도록 설정

app.get('/', (req, res) => {
  res.send('Hello World!, 안녕하세요!')
}) // 루트 디렉토리에 'Hello World!' 출력되기 하는 app

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  // 3000번 포트에서 이 앱을 실행




