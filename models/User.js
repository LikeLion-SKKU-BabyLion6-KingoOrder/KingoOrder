const mongoose = require('mongoose') // 몽구스 불러오기

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // trim: 스페이스를 없애주는 역할
        // ex) jay kim@naver.com -> jaykim@naver.com
        unique: 1 // 같은 이메일이 중복되지 못하도록 설정
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 해당 유저가 관리자? 일반 유저? 
        type: Number, // ex) number가 0이면 일반, 1면 관리자
        default: 0 // 임의로 role을 지정하지 않으면 role=0
    },
    image: String,
    token: { // 토큰을 이용해서 나중에 유효성 등 관리
        type: String
    },
    tokenExp: { // 토큰 유효기간
        type: Number
    }
})

// 스키마를 model로 감싸기
const User = mongoose.model('User', userSchema)

// 모델을 다른 파일에서도 쓸 수 있도록 export
module.exports = { User }


