const mongoose = require('mongoose')

const todo = require('./Todo')

//데이터 모델(스키마) 정의 
const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true},
    age: { type: Number, required: true},
    email: { type: String, required: true, trim: true},
    todos: { type: [todo], required: true}
})

const User = mongoose.model('User', userSchema) //실제 메모리에 모델 생성 
module.exports = User