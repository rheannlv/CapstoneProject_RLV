const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');
const port = 5501;


//Setting up MySQL
const con  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GbtstbaE2024!",
    database: "workout_gen"
});

con.connect(function(err){
    if(err) throw err;
        console.log("Connected!");
        
});

//Middleware to understand JSON data sent
app.use(express.json());


app.post("https://api.openai.com/v1/chat/completions", (request, response) =>{
    console.log("I got a request!");
    console.log(request.body);


});
    
   // const queryString = "INSERT INTO program (exercise, sets, reps) VALUES ('"+exercise+"', '"+sets+"', '"+reps+"', '"+text+"')";
    //con.query(queryString, function(err, results){
     //   if (err) {
      //     console.error('Failed to save data', error);
      //  } else {
       //     console.log("Data intserted!")
      //  }
  //  })

//    if (action === 'submit') {
       // res.sendStatus(200);
  //  }


app.use(express.static("./public"));

app.listen(port, () => {
    console.log('Server is running on port');
});

