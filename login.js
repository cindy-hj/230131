// cookie-parser
// express-session
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { application } = require('express');
const app = express();
// 1. 포트설정
app.set("port",process.env.PORT||8080);
// 2. 공통 미들웨어
app.use(express.static(__dirname+'/public'));
app.use(morgan("dev"));
// 쿠키에 암호화된 임의의 문자 전송
// => 암호화된 쿠키를 사용하기 위함
app.use(cookieParser("aaaa@1234"));
app.use(session({
    // 1. 암호화값
    secret:"aaaa@1234",
    // 2. 새로운 요청시 세션에 변동 사항이 없어도 저장할지 설정할지
    resave:false,
    // 3. 세션에 저장할 내용이 없어도 저장할 지 설정
    saveUninitialized:true,
    // 4. 세션 쿠키옵션설정
    cookie:{
        httpOnly:true,
        // => 로그인 구현시 필수 적용
        // => 자바스크립트로 접근 할 수 없게 하는 기능
    },
    name:'connect.sid'
    // => 세션쿠키의 name 지정 default 값이 connect.sid
}));
app.use(express.json);
app.use(express.urlencoded({extended:true}));

// 라우터 구성
app.get("/",(req,res)=>{
    const output = `<h2>로그인하셨습니다.</h2>
                    <p>${req.session.name}</p>`;
    res.send(output);
})

app.get("/login",(req,res)=> {
    console.log(req.session);
    req.session.name="ser";
    res.send("login ok");
})
app.get("/logout",(req,res)=>{
    res.clearCookie("connect.sid");
    res.send("logout ok");
})

// 서버 포트 연결
app.listen("port", () => {
   console.log(app.get("port"),"~번 접속중") 
})