// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
// Start up an instance of app

 
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
const port = 3132;
const Server = app.listen(port, () => {
  // Callback to debug
  console.log("Weather Server started!!!");
  console.log(`Running on this port: ${port}`);
})

// Post
app.post("/post", (req, res) => {
 /* console.log(req.body)
  projectData = req.body;
  res.send(projectData);
  */
  projectData.temp = req.body.temp;
  console.log(projectData.temp)


  projectData.date = req.body.date;
  console.log(projectData.date)

  
  projectData.feelings = req.body.feelings;
  console.log(projectData.feelings)
})

// Get
app.get("/get", (req, res) => {
    res.send(projectData)
    
})