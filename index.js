const expess = require('express');
const app = expess();
const port = 4000
const todoListDb = require('./db')

app.use(expess.json())

//Routes
app.post('/todos', async(req,res) => {
    try{
        const { title } = req.body
        const newTodo = await todoListDb.query("INSERT INTO todo (title) VALUES ($1) RETURNING *", [title])
        res.json(newTodo.rows[0])
    }catch(error){
        console.log(error.message);
    }
})

app.get('/todos', async(req,res) => {
    try{
        const todos = await todoListDb.query("SELECT * FROM todo")
        res.json(todos.rows)
    }catch(error){
        console.log(error.message);
    }
})

app.get('/todos/:id', async(req,res) => {
    try{
        const { id } = req.params
        const todos = await todoListDb.query("SELECT * FROM todo WHERE id = $1", [id])
        res.json(todos.rows)
    }catch(error){
        console.log(error.message);
    }
})

app.put('/todos/:id', async(req,res) => {
    try{
        const { id } = req.params
        const { title } = req.body
        const todos = await todoListDb.query("UPDATE todo SET title = $1 WHERE id = $2", [title, id])
        res.json("Updated successfull!")
    }catch(error){
        console.log(error.message);
    }
})

app.delete('/todos/:id', async(req,res) => {
    try{
        const { id } = req.params
        const todos = await todoListDb.query("DELETE FROM todo WHERE id = $1", [id])
        res.json("TODO Deleted")
    }catch(error){
        console.log(error.message);
    }
})





app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})