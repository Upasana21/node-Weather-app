const express = require("express");
const path = require("path");
const hbs = require("hbs"); //for using partials (common template that can be reused)
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");

const app = express(); //creates an express application

// console.log(__dirname);
// console.log(path.join(__dirname,'/public'));
// console.log(helpDirPath)

//this static method will serve/bring the index page to app.js
//define paths for express config
const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath)); //this is static and will not change on refesh
//using handlebar i.e. hbs to create dyamic web page

//seting handlebar engine and views folder location to templates
const viewsPath = path.join(__dirname, "../templates/views");
//setting partials path
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//app.get=>route handlers
app.get("", (req, res) => {//index.hbs
  res.render("index", {
    title: "Weather",
    name: "Upasana Bhandari",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    example: "Do you need any help????",
    name: "Upasana",
  });
});

// http://localhost:3000/help.html

// app.get('',(req,res)=>{
//     res.send('Hello express')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

//route

app.get("/weather", (req, res) => {
  if (!req.query.query) {
    return res.send({
      error: "Please provide a addresss",
    });
  }
  geoCode(
    req.query.query,
    (error, { latitude, longitude, locality } = {}) => {
      // ={} used as default value in case an error occured
      //(error,data) replaced by property destructuring
      if (error) {
        return res.send({error });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
            forecast: forecastdata,
            geoData: locality,
            address: req.query.query,
          });
      });
    }
  );  
});

//404 error at the end of routes
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    error: "Help Article not found",
    name: "Upasana Bhandari",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    error: "404 Page not found error",
    name: "Upasana Bhandari",
  });
});

//this will run the server , and run once
app.listen(3000, () => {
  //starting of server is aysnchoronous process, so in case any error on restarting we can know
  console.log("Server is listening on port 3000");
});

//nodemon src/app.js -e js,hbs
