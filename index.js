import express from 'express';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';

const app = express()

const port = 3000

function loggerMiddleware(req, res, next){
    console.log('Time:', Date.now())
    next()
}

app.use(loggerMiddleware)
app.use(bodyParser.json())

const todos = []

app.get('/todos', (req, res) => {

  req.body.task
  res.json({
    "todos": todos
  })
})

app.post('/todos', (req, res) => {
    const newTodo = {
        "id": nanoid(),
        "task": req.body.task,
        "completed": req.body.completed
    }
    todos.push(newTodo)

    res.json(newTodo)
})

app.put('/todos/:id', (req, res) => {
    res.json({
        "id": 1, 
        "task": "Updated task",
        "completed": true
    })
})

// Set the port server is listening the information
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})