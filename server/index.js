//서버의 메인
var express = require('express') //라이브러리를 읽어올때 require() 씀
var app = express() 
var cors = require('cors') //cors 설정 => 동일 출처정책(보안)
var mongoose = require('mongoose') //Mongo DB 연동
var logger = require('morgan')
var routes = require('./src/routes') //API 구현
var port = 5000

// CORS 를 허용할 사이트만 등록하여 서버에 등록된 사이트들만 사용자 요청에 대한 응답을 허용하도록 설정
corsOptions = { //cors 옵션
    origin: 'http:localhost:5000',
    credentials: true
}

//Mongo DB 연동
const CONNECT_URL = 'mongodb://localhost:27017/kaya'
mongoose.connect(CONNECT_URL, { //Mongo DB 서버 연결 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log('mongodb connected...'))
.catch( e => console.log(`failed to connect to ${e}`))


//미들웨어(middleware) 
app.use(cors(corsOptions)) //cors 설정(로컬 호스트5000만 허용하겠다는의미)
app.use(express.json()) //request body 파싱 
app.use(logger('tiny')) 
app.use("/api", routes)

app.get('/hello', (req, res)=>{// req 요청 res 응답 객체
    res.send('hello world')
})

app.use( (req, res, next) =>{ // 사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
})

app.use((err, req, res, next)=>{ //서버 내부 오류 처리 
    console.log(err.stack)
    res.status(500).send("sothing is broken on server")
})

app.listen(port, () => {// 5000 포트로 서버 오픈
    console.log(`server is running on port ${port}`)
})