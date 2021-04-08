// Setup empty JS object to act as endpoint for all routes. To store data coming from the client.
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8020;

//Launch the server (port of the server, function when server runs)
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};


//Setup a GET route that returns all data from the server to the end point
//I set the route name. I used allData, but we can use whatever name we would like. It is just a name.
app.get("/allData", function(req,res){
    res.send(projectData);
    console.log("Get route works!")
    //den eimai sigouros gia to reurn
    //return(projectData);
    //projectData = {};
});



//Setup a POST route (send date, temp and feelings)

app.post("/addWeatherData", addData);

function addData(req, res) {
    let data = req.body;
    console.log(req.body);
    let addingData = {
        temperature: data.temperature,
        date: data.date,
        userResponse: data.userResponse
    };
    projectData = addingData;
    res.send(projectData);
    console.log(projectData);
};



