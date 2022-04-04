// Setup empty JS object to act as endpoint for all routes
projectData  = {};

// Require Express to run server and routes
const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
// Start up an instance of app
const app =express();
// setting the port
const port=8080;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, listening);
function listening(params) {
    console.log(`server running at localhost:${port}`)
}
//get to sent projectData  to the website
app.get("/get", (req, res) => {
    // console.log(projectData )
    res.send(projectData )
});
//post to recive projectData  from the website
app.post('/post', addData)

function addData(req, res) {
    projectData.date =req.body.date
    projectData.temp =req.body.temp
    projectData.input =req.body.input
    // console.log(projectData )
}