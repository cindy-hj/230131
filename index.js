// 모듈
// => 서로 데이터를 파일간 사용하기
// => 가지고 올때 require()
// => 보내는 파일 module export()

// 1. http 모듈 서버만들기
// const { create } = require('domain');
// const http = require('http');

// 서버 만드는 함수
// http.createServer((req, res)=>{
//     // res.writeHead(요청코드, 파일 형식)
//     res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
//     // => 응답에 대한 정보를 기록하는 함수
//     res.write("<h1>서버만들기</h1>");
//     // => 인자를 클라이언트에 보낼 데이터삽입
//     res.end("<p>http모듈</p>");
//     // => 응답에 대한 종료 매서드
//     // => 인자까지 전달하고 응답 종료
// }).listen(8080, () => {
        // 터미널에서 확인 가능
//     console.log("8080포트로 접속중");
// })
// 위와 같은 표현
// http.createServer(function(req, res){})

// http 상태코드(요청 코드)
// 1. 100번대
// => 정보/서버가 요청을 받았고 클라이언트는 작업을 계속해도 됨을 의미함
// 2. 200번대
// => 성공/요청을 성공적으로 받았음을 수용했다는 의미함
// => 204 : 요청은 성공했으나 제공할 내용이 없음을 의미
// 3. 300번대
// => 리다이렉션/요청을 완료하기 위해서 추가적인 작업이 필요함을 의미
// 4. 400번대
// => 클라이언트 서버 오류를 의미
// => 401 : 요청에 대한 권한을 의
// => 403 : 요청이 서버에 의해서 거부됨을 의미
// => 404 : 요청한 url 찾을 수 없음
// 5. 500번대
// => 서버오류

// 서버 만드는 함수
// const server = http.createServer((req, res)=>{
//     res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
//     res.write("<h1>서버만들기 listen 콜백없음</h1>");
//     res.end("<p>http모듈</p>");
// }).listen(8080);

// // listen 콜백함수 대신
// // listening 이벤트 리스너를 붙여서 사용 할 수 있음
// server.on("listening", () => {
//     console.log("8080 접속중임");
// })
// // 오류를 핸들링 해주는 이벤트 리스너도 추가 할 수 있음
// server.on("error", () => {
//     console.log("error");
// })

// fs 모듈 서버만들기
// const fs = require('fs').promises;
// => promise 알리미
// => 동기적 : 순차
// => 비동기적 : 비순차(한번에)
// fs.readFile('파일명',(error,file)=>{
//     비동기적 파일을 읽음
// })
// fs.readFileSync('파일명') 
// 동기적 파일을 읽음
// fs.exists : 파일확인
// fs.writeFile('파일명', 문자열, (error,file)=>{
//     비동기적 파일을 씀
// });
// fs.writeFileSync('파일명', 문자열); 
// 동기적 파일을 씀

// 예외처리
// try {
//     파일을 읽고 출력함
// }
// catch(){
//     예외 발생했을때 
// }
// http.createServer(async(req,res)=>{
//     // async
//     // => promise 구동으로 비동기적 수행을 표시
//     // await async 키워드가 붙은 함수 안에서만 사용 가능
//     try {
//         const f = await fs.readFile("./ex_test.html");
//         // => readFile 순서대로 파일의 위치, 텍스트 타입, 콜백함수 순서
//         // => 데이터는 내가 전송하게 되는 데이터로 write로 브라우저에 써줌
//         res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
//         res.end(f);
//     } catch (err) {
//         // 오류 처리 영역
//         console.error(err);
//         res.writeHead(500, {"Content-Type": "text/html;charset=utf-8"});
//         res.end(err.message);
//     }
// })
// .listen(8080, () => {
//     console.log("8080 연결중");
// })

// npm i express
// npm i -g nodemon 서버 실시간 확인(g붙이면 전역에 까는것)

// const express = require('express');
// const app=express();

// app.get('/',(req,res)=> {
//     // res.send('문자열');
//     // => 인수의 문자열을 보내줌
//     res.sendFile(__dirname+"/ex_test.html");
//     // => 인수의 파일을 보내줌
// })
// app.listen(8080, ()=> {
//     console.log('8080 접속중');
// });

// express 미들웨어
// 1. express.static
// => 정적파일: 이미지, css, 스크립트 파일
// => 응답시 별도의 처리 없이 내용 그대로를 보여줌
// app.set("port",process.env.PORT||8080);
// app.use(express.static(__dirname+'/public'));
// // => static에서 지정한 폴더 안에서 html에 있는 정적 파일을 찾으므로 경로 노출이 덜함
// app.get('/',(req,res)=> {
//     res.sendFile(__dirname+'/ex_test.html');
// });
// app.listen(app.get("port"),()=>{
//     console.log(app.get("port"),"포트 서버 실행중");
// });

// 2. router
// => 클라이언트로부터 요청이 왔을때
// => 서버에서 어떤 응답을 보낼지 결정하는 미들웨어

// app.use('/경로', 미들웨어)
// app.get('/경로', 미들웨어)
// app.post('/경로', 미들웨어)
// app.put('/경로', 미들웨어)
// app.delete('/경로', 미들웨어)

// => express에서 위에 처럼 모듈을 담은 변수에 http 메서드가 붙는 것
// app.set("port",process.env.PORT||8080);
// app.use(express.static(__dirname+'/public'));
// app.get('/', (req,res) => {
//     const output = `
//         <h1>이미지삽입</h1>
//         <p>텍스트 형식의 태그 삽입</p>
//         <img src="./chocolate.jpg" width="400px" height="400px" />
//     `;
//     res.send(output);
// })
// app.listen(app.get("port"),()=>{
//     console.log(app.get("port"),"포트 서버 실행중");
// });

// app.set("port",process.env.PORT||8080);
// // app.use(express.static(__dirname+'/public'));
// app.get('/user/:id', (req,res) => {
//     res.send(req.params.id+"님이 접속하셨습니다.");
//     // => req.params :id를 활용하여 정보 제공
// })
// app.listen(app.get("port"),()=>{
//     console.log(app.get("port"),"포트 서버 실행중");
// });
// 요청을 하는 함수
// => app.use, app.get
// 응답을 위한 함수
// => res.send() : 문자열을 응답
// => res.sendFile() : 파일을 응답
// => res.json() : json 객체로 응답
// => res.render() : jade, pug와 같은 템플릿을 랜더링하는 응답

// 3. morgan
// => request와 response를 잘 정리해서 콘솔에 찍는 역할
// npm i morgan으로 따로 설치
// const morgan = require('morgan');
// app.use(morgan("combined"));
// app.use(express.static("/public"));

// app.get("/",(req,res)=>{
//     res.send("터미널 창을 보세요")
// })
// app.listen(8080,()=>{
//     console.log("서버 러닝~~~ 8080");
// });

// 4. body-parser
// => 기본 입력 양식을 분석함
// => 대용량 안됨
// => post, put 요청시 들어온 정보를 정보가 있는 req.body에 접근하기 위해 필요함
// app.use(express.urlencoded({extended:false}));
// => extended:false -> node.js 안에 있는 queryString을 사용
// => extended:true -> npm의 qs 모듈을 사용

// app.set("port",process.env.PORT||8080);

// app.get('/', (req,res) => {
//     let input=`
//         <form method = "post">
//             <input type="text" name="a" />
//             <input type="text" name="b" />
//             <input type="submit" />
//         </form> 
//     `
//     res.send(input);
// });

// app.post("/",(req,res)=> {
//     res.send(req.body);
// });

// app.listen(8080,()=> {
//     console.log("서버 러닝 8080");
// });

// next()의 종류
// -next()
// => 다음 미들웨어로 가는 역할
// -next(error)
// => 오류처리를 하는 미들웨어로 이동하는 역할
// -next('router')
// => 라우터의 분기 처리를 할때
// app.set("port",process.env.PORT||8080);

// app.get("/",(req,res,next)=> {
//     res.send("텍스트");
//     next();
// });
// const myLogger = (req,res,next) => {
//     console.log("logger")
//     next();
// }
// app.use(myLogger);

// app.listen(8080,()=> {
//     console.log("서버 러닝 8080");
// });

// 오류처리를 위한 미들웨어
// => 총 4개의 인수를 받음
// => error, req, res, next
// => 오류처리하는 미들웨어는 따로 다루어야함

// app.use(function(err,req,res,next){
//     console.error(err.stack);
//     res.status(500).send("에러야")
// });

// express로 서버 구성 순서
// 1. express를 불러옴
// const express = require('express');
// const app=express();

// 2. 포트설정
// app.set("port",process.env.PORT||8080);

// 3. 공통사용 미들웨어 장착
// app.use(express.urlencoded({extended:false}));
// const morgan = require('morgan');
// app.use(morgan("combined"));

// 4. 라우터 구성
// app.get("/",(req,res)=>{
//     res.send("터미널 창을 보세요")
// })

// 5. 404 처리 미들웨어 구성
// app.use(function(err,req,res,next){
//     console.error(err.stack);
//     res.status(404).send("에러야")
// });

// 6. 오류처리 미들웨어 구성
// app.get((err,req,res,next)=>{...});

// 7. 생성된 서버 포트를 리스닝함
// app.listen(8080,()=> {
//     console.log("서버 러닝 8080");
// });

// 5. cookie-parser
// => 쿠키 출입증 키쌍(name=cindy)
// res.writeHead(200,{"Set-cookie":"name=cindy"});
// => 처음 한번 서버에서 res.writeHead() 메서드를 통해 Set-cookie에 값을 넣으면 쿠키가 헤더에 저장함
// => 이후에 브라우저에 요청시 서버에 보냄
// app.use(express.urlencoded({extended:false}));
// app.set("port",process.env.PORT||8080);
// const http=require("http");
// http.createServer((req,res)=>{
//     res.writeHead(200,{"Set-cookie":"name=cindy"});
//     console.log(req.headers.cookie);
//     res.end("cookie=>header");
// }).listen(8080,()=> {
//     console.log("서버 러닝 8080");
// });

// 세션
// => 실제 정보는 서버에 저장을 해두고 브라우저에서
// => 암호화된 키값만 보내고 그 키값으로 실제값에 접근 할 수 있도록 하는것
// app.use(express.urlencoded({extended:false}));
// app.set("port",process.env.PORT||8080);
// const http=require("http");

// const session = {};
// const sessKey = new Date();
// session[sessKey]={name:'cindy'};

// http.createServer((req,res)=> {
//     // res.writeHead(200,{"Set-cookie":'session=${sessKey}'});
//     // session[sessKey]
//     res.end("session=>header");
// }).listen(8080,()=>{
//     console.log("8080중");
// });

// 네이버
// 네이버 검색 API 예제 - 블로그 검색
var express = require('express');
var app = express();
var client_id = 'mjukuKTujMfBzcGHK6By';
var client_secret = 'f6kDqeu3yV';
app.get('/search/blog', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // JSON 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
 });