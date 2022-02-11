const mongoose = require('mongoose')

//데이터 모델(스키마) 정의 
const todoSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true},
    dome: { type: boolean, default: false},
    description: { type: String, required: true, trim: true}
})

const Todo = mongoose.model('Todo', todoSchema) // 실제 메모리에 모델 생성
module.export = Todo