const mongoose = require("./db/mongoose");
const Todo = require("./models/todo");
const User = require("./models/user");
mongoose.Promise = global.Promise;

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  console.log(req.body);
  const todo = new Todo({ text: req.body.text });
  todo.save().then(
    (doc) => {
      console.log("new note saved ", doc);
      res.status(200).json({ message: "Success" });
    },
    (err) => {
      console.log("an error occured");
      res.status(500).json({ error: err });
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    (todos) => {
      res.status(200).json({ todos });
    },
    (err) => {
      res.status(500).json({ error: err.message });
    }
  );
});

app.get("/", (req, res) => {
  console.log("now in index");
  res.send("<h1> now in index</h1>");
});

app.all("*", (req, res) => {
  res.send("<h1>route not found</h1>");
});

app.listen(3000, () => {
  console.log("Started listening on port 3000 😎");
});
