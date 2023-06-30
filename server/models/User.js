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
    }
})

// pre() 는 몽구스의 메서드. 'save'는 암호화 속성
// 저장하기 전에 이 함수를 실행하시오
userSchema.pre('save', function (next) {
    var user = this; // this가 뭘 가리키는 거지?
    if (user.isModified('password')) { // 비밀번호가 수정될 때 발동
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err); // 암호화 실패시: err 반환
                user.password = hash; // 암호화 성공시: hash된 비밀번호로 교체
                next();
            })
        })
    } else {
        next(); // 비밀번호 변경이 아닐 경우 바로 내보내기
    }
})


userSchema.methods.comparePassword = function (plainPassword, cb) {
    //암호화된 비밀번호 == 암호화된 plain패스워드 체크
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err); // 에러라면 에러 반환하고 함수 종료
        cb(null, isMatch); // isMatch=true 
    })
}



userSchema.methods.generateToken = async function (cb) {
    // 유저 id 가져오기 (이메일 아님. DB의 암호화된 ID)
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    // user._id + 'secretToken' = token 이 된다
    // 역으로, token에다가 'secretToken'를 넣어 유저 id를 찾는 원리
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    // var token = jwt.sign({id: user._id}, 'secretToken');

    user.token = token; // 생성한 토큰을 user에 넣어주기
    try {
        await user.save();
        cb(null, user);
    } 
    catch (err) {
        cb(err);
    }

}


userSchema.statics.findByToken = function (token, cb) { // 인자에 넣음으로써 token을 가져왔음
    var user = this;

    // 토큰을 decode 한다
    jwt.verify(token, 'secretToken', function (err, decoded) { // verify 사용법: jsonWebToken에서 참고

        // 유저 ID를 이용해서 유저를 찾고, 
        // 클라이언트에서 가져온 토큰과 DB 토큰 일치여부 확인
        // user.findOne({ "_id": decoded, "token": token }, function (err, user) {
        //     if (err) return cb(err);
        //     cb(null, user); // 에러가 없다면 유저 정보 전달 
        // })

        user.findOne({ "_id": decoded, "token": token })
            .then(function (user) { cb(null, user); }) // 에러가 없다면 유저 정보 전달 
            .catch(function (err) { cb(err); }) // 에러가 있다면 에러 전달
    })
}

// 스키마를 model로 감싸기
const User = mongoose.model('User', userSchema);

// 스키마로 감싼 모델(User)을 다른 파일에서도 쓸 수 있도록 export
module.exports = { User };


