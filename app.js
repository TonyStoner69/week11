let express = require('express');
let app=express();
let socket = require('socket.io');
let server=require('http').Server(app);
const path = require('path');

let io=socket(server);
app.use("/", express.static(path.join(__dirname, "dist/chart")));

let pollObj = {
    question: "Select Your Favourite Component",
    options: [
      { text: "Angular", value: 0, count: 0 },
      { text: "MongoDB", value: 1, count: 0 },
      { text: "Express.js", value: 2, count: 0 },
      { text: "Golang", value: 3, count: 0 },
      { text: "Python", value: 4, count: 0 },
      { text: "C#", value: 5, count: 0 },
      { text: "PhP", value: 6, count: 0 },
      { text: "C++", value: 7, count: 0 },
    ],
  };

io.on('connection', function(socket){
    socket.emit("welcomeEvent", pollObj);
    socket.on("newOp", function (data) {
        console.log(data.value);
        pollObj.options[data.value].count++;
        let res = {count:pollObj.options[data.value].count, value: data.value}
        socket.emit("newResult", res);
        

    });
    
    
   
});
console.log("connect succesfully");



server.listen(8080);