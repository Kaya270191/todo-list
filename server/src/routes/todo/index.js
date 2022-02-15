const express = require('express')
const TodoRouter = express.Router() //하위 서브 라우터  /api/todos/{id}
const Todo = require("../../models/Todo") //정의한 모델 가져오기


// 전체할일 조회
TodoRouter.route('/').get( async (req, res) => {
    const todos = await Todo.find()
    res.json({ status: 200, todos})
})

// 특정 할일 조회 
TodoRouter.route('/:id').get( (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({ status: 200, todo})
    })
})


// 추가 
// /api/todos/{id}

TodoRouter.route('/').post( (req, res) => {
    console.log(`name: ${req.body.name}`)
    Todo.findOne({ name: req.body.name, done: false }, async (err, todo) => { // 중복체크
        if(err) throw err;
        if(!todo){ // 데이터베이스에서 해당 할일을 조회하지 못한 경우
            const newTodo = new Todo(req.body);
            await newTodo.save().then( () => {
                res.json({ status: 201, msg: 'new todo created in db !', newTodo})
            })

        }else{ // 생성하려는 할일과 같은 이름이고 아직 끝내지 않은 할일이 이미 데이터베이스에 존재하는 경우
            const msg = 'this todo already exists in db !'
            console.log(msg) 
            res.json({ status: 204, msg})
        }
    })
    
})

TodoRouter.route('/').post( (req, res) => {
    res.send(`todo ${req.body.name} created`)
})


// /api/todos

//특정 할일 변경 
// /api/todos/{id}
TodoRouter.route('/:id').put( (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, todo) => {
        if(err) throw err;
        res.json({status:204, msg: `todo ${req.params.id} updated in db!`, todo})
    })
    //데이터베이스에서 파라미터로 전달된 id 값으로 해당 할일 도큐먼드를 찾음
    //찾은 도큐먼트 업데이트
})



TodoRouter.route('/:id').delete( (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({ status: 204, msg: `todo ${req.params.id} removed in db !`})
    })
})


module.exports = TodoRouter //모듈을 내보낼 때 module.export