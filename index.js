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

let todos = []

// Route to get all the to dos and send a response as a json file
app.get('/todos', (req, res) => {

  req.body.task
  res.json({
    "todos": todos
  })
})

// Route to create a new to do and send back a json file with the information provided
app.post('/todos', (req, res) => {
    const newTodo = {
        "id": nanoid(),
        "task": req.body.task,
        "completed": req.body.completed
    }
    todos.push(newTodo)

    res.json(newTodo)
})

// Route to update a to do from the list. Send back a json file
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const {task, completed} = req.body;

  // Find the specific to-do to update
  const todoToBeUpdated = todos.find(todo => JSON.stringify(todo.id) === JSON.stringify(id))

  // Update the information inside specific to-do task
  const updatedTodo = {
    "id": todoToBeUpdated.id,
    "task": task,
    "completed": completed,
  }

  // Find the specific to-do to update
  todos = todos.map(todo => {
    if(todo.id === id){
      return updatedTodo
    }
    return todo
  })
 
    res.json({updatedTodo})
})

// Route to delete a to do from the list. Return just an empty json file with a positive status code
app.delete('/todos/:id', (req, res) => {
  res.status(200 ).json({})
})

// Set the port server is listening the information
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})