const express = require("express");

//app
const app = express();
app.use(express.json());

let todoList = [
    {
        "id": "1", 
        "title": "Morning Routine",
        "description":"Make Bed",
        "Due_Date":"till 8:00",
        "Category": "Personal",
        "Status":"Completed",
        "Priority":"Medium",
        "User": "Ben"
    }
]

//routers and others
//create task
app.post('/todos', (req, res) =>{
    let {title, description, Due_Date, Category, Status, Priority} = req.body;
    let todo = {
        id: todoList.length() + 1,
        title:title,
        description:description,
        Due_Date:Due_Date,
        Category:Category,
        Status:Status,
        Priority:Priority
    };

    todoList.push(todo);

    res.status(201).json({message:'Todo Added successfully'});
})

//complete task
app.patch('/todo/:id', (req, res) => {
    let todoid = req.params.id;
    let status = req.body.status;
    let user = req.body.user;

    const index = todoList.findIndex( todo => todo.id == todoid);

    if (index === -1) {
        return res.status(404).json({message: "Todo item not found"});
    }

    if (todoList[index].User !== user){//authentication
        return res.status(500).json({message:"You are not authenticated to change status"})
    }

    todoList[index].Status = status;

    res.json(200).json({message:'Todo is completed'});

})

//get all tasks for a particular user
app.get('/todos',(req, res) =>{
    let user = req.body.user;

    let userTodos = todoList.filter( todo => todo.User == user)

    res.status(200).json({
        message:"getting all todos",
        userTodos
    });
})

//view task based on completion status
app.get('/todos/:status', (req, res) =>{
    const todoStatus = req.params.status;
    let user = req.body.user;

    let list = todoList.filter(todo => todo.Status == todoStatus)
    list = list.filter(todo => todo.User == user);

    res.status(200).json({
        message:"getting todos with particular status",
        list
    })
})

//view task based on priority
app.get('/todos/:priority', (req, res) =>{
    const todoPriority = req.params.priority;
    let user = req.body.user;

    let list = todoList.filter(todo => todo.Priority == todoPriority);
    list = list.filter(todo => todo.User == user);

    res.status(200).json({
        message:"getting todos with particular Prioirty",
        list
    })
})

app.listen(3001, () => {
    console.log("App listens at port 3001")
})