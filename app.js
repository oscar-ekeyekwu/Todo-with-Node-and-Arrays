var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var http = require("http");
var url = require("url");

var app = express();

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 5000);

var todoItems = [];
//====making todoItems[] available ===//
app.locals.todoItems = todoItems;

app.use(logger("short"));
app.use(bodyParser.urlencoded({extended: true}));

//====new task route====//
app.post("/newtodo",function(req,res){
  console.log(req.body.item);
  todoItems.push({item: req.body.item});
  res.redirect("/");
});

app.get("/", function(req,res){
  res.render("index", {todoItems: todoItems, completedTask: completedTask});
});

//=====favicon route=====//
app.get("/favicon.ico", function(req, res){
  res.status(200);
  res.redirect("/");
});

var completedTask = [];
app.locals.completedTask = completedTask;

app.get("/remove", function(req, res){
var item = req.query.item;
  console.log(item);
  completedTask.push({item: req.query.item});
  todoItems.splice(todoItems.indexOf({item: req.query.item}), 1);
  res.redirect("/");
});

//====404 error route====//
app.use(function(req,res){
  res.status(400).render("404");
});

//========server listening on port 5000 =====//
app.listen(app.get("port"), function() {
console.log("Todo App started on port " + app.get("port"));
});
