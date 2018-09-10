const express = require('express');
      app = express();
      bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views')); // telling express where to find the static files
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
  res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(8080, () => {
  console.log('App is running on port 8080');
});