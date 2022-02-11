const express = require('express') //모듈 가져옴
const router = express.Router() //서브 라우터
const todo = require('./todo')

router.use('/todos', todo) // /api/todos/ => todo 모듈을 실행해라


module.exports = router
