const mongoose = require('mongoose'); // 몽구스 불러오기
const bcrypt = require('bcrypt'); // bcrypt 불러오기
const saltRounds = 10; // salt 만들기 위해 필요함 (salt가 몇 글자인지?)
const jwt = require('jsonwebtoken');

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

// pre() 는 몽구스의 메서드. 'save'는 암호화 속성
// 저장하기 전에 이 함수를 실행하시오
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) { // 비밀번호가 수정될 때 발동
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err) // 암호화 실패시: err 반환
                user.password = hash // 암호화 성공시: hash된 비밀번호로 교체
                next()
            })
        })
    } else {
        next() // 비밀번호 변경이 아닐 경우 바로 내보내기
    }
})

// 스키마를 model로 감싸기
const User = mongoose.model('User', userSchema);

userSchema.methods.comparePassword = function (plainPassword, cb) {
    
    // hashed 비밀번호를 다시 복호화할 순 없다.
    // plainPassword를 암호화한 다음에, DB에 해당 암호문(?)이 있는지로 비교한다
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        // console.log(this);
        if (err) return cb(err),
        cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function (cb) {
    // 유저 id 가져오기 (이메일 아님. DB의 암호화된 ID)
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    // user._id + 'secretToken' = token 이 된다
    // 역으로, token에다가 'secretToken'를 넣어 유저 id를 찾는 원리
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token; // 생성한 토큰을 user에 넣어주기
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

// 모델을 다른 파일에서도 쓸 수 있도록 export
module.exports = { User }


