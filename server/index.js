const express = require('express')
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())

const uuid = require('uuid') 

let tasks = []

app.get('/', (request, response) => {
  response.send('Hello World!');
})

app.get('/api/todos', (request, response) => {
  try {
    response
    .status(200)
    .send(tasks)
  } catch (error) {
    response
      .status(500)
      .send({ error_message: "Failed to get all Tasks." })
  }
})

app.post('/api/todos', (request, response) => {
  const task = request.body
  task.id = uuid.v4()

  try {
    tasks.push(task)

    response
      .status(201)
      .send({
        message: "Added Task successful.",
        data: task
      })
  } catch (error) {
    response
      .status(500)
      .send({ error_message: "Task added failed." })
  }
})

app.put('/api/todos/:id', (request, response) => {
  try {
    const id = request.params.id
    const updateTask = request.body
    const taskEditIndex = tasks.findIndex(task => task.id === id)

    if (taskEditIndex !== -1) {
      tasks[taskEditIndex] = { ...updateTask, id }
      response
        .status(200)
        .send({
          message: "Task update successful.",
          data: tasks[taskEditIndex]
        })
    } else {
      response
        .status(404)
        .send({ error_message: "Task not found." })
    }
  } catch(error) {
    response
      .status(500)
      .send({ error_message: "Task update failed." })
  }
})

app.delete('/api/todos/:id', (request, response) => {
  try {
    const id = request.params.id
    const taskDeleteIndex = tasks.findIndex(task => task.id === id)

    if (taskDeleteIndex !== -1) {
      tasks.splice(taskDeleteIndex , 1)
      response.send({ message: 'Task delete successful.' })
    } else {
      response
        .status(404)
        .send({ error_message: "Task not found." })
    }
  } catch (error) {
    response
      .status(500)
      .send({ error_message: "Task delete failed." })
  }
})

const PORT = 3030

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})