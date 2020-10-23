var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    usernames = [];
var PORT = process.env.PORT || 3000;
server.listen(PORT);

console.log("Server started at http://localhost:" + PORT + "/");

app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/js', express.static(__dirname + '/assets/js'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/assets/index.html');
});

io.sockets.on('connection', function(socket){
  
  // new user
  socket.on('new user', function(data, callback){
    if(usernames.indexOf(data) != -1){
      callback(false);
    }
    else{
      callback(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames();
    }
    
  });

});
