const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Todo } = require("./models/todo");

require("dotenv").config();

const mongodbUrl =
  "mongodb+srv://123davidbill:kJRHacQC2uYNvwfz@cluster0.6dfnkfm.mongodb.net/?retryWrites=true&w=majority";

const whitelist = ["http://localhost:8080", "http://localhost:8081"];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// 避免連線前就已經有資料進來
async function connectMongoDB() {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("Connected to MongoDB...");
    connectStatus = true;
  } catch (error) {
    console.log(error);
  }
}

connectMongoDB();

const app = express();
app.use(cors());
// 限定 http://localhost:8080 才可以存取
app.use(cors(corsOptions));

const data = [];

app.use(express.json());

app.use((req, res, next) => {
  if (connectStatus) {
    next();
  } else {
    res.status(503).send({
      status: false,
      message: "Server is not ready",
    });
  }
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send({
    status: true,
    data: todos,
  });
});

// post
app.post("/todos", async (req, res) => {
  const { title, completed } = req.body;

  const todo = new Todo({
    id: new Date().getTime(),
    title,
    completed,
  });

  await todo.save();
  res.send({
    status: true,
    message: "Create todo successfully",
  });
});

app.listen(process.env.PORT);
