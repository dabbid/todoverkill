var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();

var dataFilePath = './api/data.json';

router.get('/todos', function(req, res, next) {
  jsonfile.readFile(dataFilePath, function(err, json) {
    res.send(json);
  });
});

router.get('/todos/:id', function(req, res, next) {
  if (/^\d+$/.test(req.params.id)) {
    jsonfile.readFile(dataFilePath, function(err, todos) {
      var requestedTodo = todos.find(function(todo) {
        return todo.id === Number(req.params.id);
      });
      res.send(requestedTodo);
    });
  }
});

router.put('/todos/:id', function(req, res, next) {
  if (/^\d+$/.test(req.params.id)) {
    jsonfile.readFile(dataFilePath, function(err, todos) {
      if (!err) {
        var requestedTodoIndex;
        var requestedTodo = todos.find(function(todo, index) {
          if (todo.id === Number(req.params.id)) {
            requestedTodoIndex = index;
            return true;
          }
          return false;
        });
        if (requestedTodo) {
          requestedTodo = Object.assign(requestedTodo, req.body);
          todos[requestedTodoIndex] = requestedTodo;
          jsonfile.writeFile(dataFilePath, todos, function(err) {
            if (!err) {
              res.send(requestedTodo);
            }
          });
        }
      }
    });
  }
});

module.exports = router;
