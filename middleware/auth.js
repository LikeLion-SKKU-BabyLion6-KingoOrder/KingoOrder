const {User} = require("../models/User");


let auth = (req, res, next) => { // 인증 처리 하는 곳
    // 클라이언트 쿠키(x_auth)에서 토큰 가져오기
    let token = req.cookies.x_auth; 

    // 토큰을 Decode하고, DB에서 유저 찾기
    User.findByToken(token, (err, user) => {
        
        // 에러 뜨면 에러 던지기
        if(err) throw err;

        // 유저가 없다면 클라이언트에 메시지 전달 (인증 X)
        if(!user) return res.json({isAuth: false, error: true}); 

        // 유저가 있다면 (인증 OK)
        // 리퀘스트에 토큰, 유저를 넣는 이유는
        // index.js에서 req.user와 req.user를 통해 바로 token과 user를 받을 수 있도록하는 거임
        req.token = token;
        req.user = user;
        next(); // 미들웨어에서 (req, res) 인자로 넘어갈 수 있도록
    })
};

// auth를 다른 파일에서도 쓸 수 있게 module.exports
module.exports = { auth };