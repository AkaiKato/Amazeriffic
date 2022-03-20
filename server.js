const ToDosController = require("./controllers/todos_controller");
const UsersController = require("./controllers/users_controller");

var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express();

http.createServer(app).listen(3000);

app.use('/', express.static(__dirname + "/client"));
app.use('/users/:username', express.static(__dirname + "/client"));

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/amazeriffic', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log("DB PIZDECConnected!")
    console.log(Error, err.message);
});


app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show);
app.post("/todos", ToDosController.create);
app.put("/todos/:id", ToDosController.update);
app.delete("/todos/:id", ToDosController.destroy);


app.get("/users/:username/todos.json", ToDosController.index);
app.post("/users/:username/todos", ToDosController.create);
app.put("/users/:username/todos/:id", ToDosController.update);
app.del("/users/:username/todos/:id", ToDosController.destroy);

app.get("/users.json", UsersController.index);
app.post("/users", UsersController.create);
app.get("/users/:username", UsersController.show);
app.put("/users/:username", UsersController.update);
app.del("/users/:username", UsersController.destroy);