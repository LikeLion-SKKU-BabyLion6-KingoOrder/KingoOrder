README.md 테스트

2023.06.03 수정 사항
1. Mongoose Error: findOne(), findOneAndUpdate no longer accepts a callback 문제 반영
- 콜백 받는 대신 Promise (then, catch) 또는 async/await (try, catch)로 바로 받도록 코드 변경

2. server 폴더, client 폴더 분리