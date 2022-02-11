const express = require('express')
const TodoRouter = express.Router() //하위 서브 라우터  /api/todos/{id}

//  /api/todos/
TodoRouter.route('/').get( (req, res) =>{
    res.send('all todo list')
})

module.exports = TodoRouter