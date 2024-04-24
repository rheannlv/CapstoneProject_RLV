const { error } = require('console');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');
const port = 3001;
//Middleware to understand JSON data sent
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")))

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

//Setting up MySQL
const con  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GbtstbaE2024!", 
    database: "workout_gen"
});

con.connect(function(err){
    if(err) throw err;
        console.log("MySQL Connected!");
        
});

//Getting home page
app.get('/home', (req, res) =>{
   res.sendFile("index.html", {root: path.join(__dirname, "/public")
    });
});


//Getting data from db
app.get('/muscle_hx', (request, response) => {

        const dbQ = "SELECT * FROM muscle_history;";

        con.query(dbQ, function(err, result){
          if (err) {
            console.error('Failed to pull data', error);
          } else {
          console.log(result);
          response.json(result.map(item => ({ muscle: item.muscle })));
          }
        });

});

//Grabbing data from client selection into db
app.post("/",(request, response) => {
    console.log("I got a request!");
    console.log(request.body);
    const data = request.body;

    response.json({
        status: 'success',
        muscle: data.muscle
    });
    
    const queryString = "INSERT INTO muscle_history (muscle) VALUES (?);";
    con.query(queryString, [data.muscle], function(err, results){
      if (err) {
        console.error('Failed to save data', error);
       } else {
         console.log("Data intserted!")
      }
     });
  
  });





