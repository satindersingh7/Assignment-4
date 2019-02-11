var express = require("express");
var request = require("request");
var app     = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    // console.log(req.query.search);
    var city = req.query.search;
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c2675cc27e2d55338119291273f23807";

    request(url, function(err, response, body){
        var parsedData = JSON.parse(body);
        if(err){
            console.log("Error");
            res.redirect("/");
        }
        else if(!err && response.statusCode==200 && parsedData.cod==200)
        {
            if(parsedData == undefined)
            {
                res.redirect("/");
            }
            else{
                res.render("index", {data: parsedData});
            }
            // console.log(parsedData);
        }
        else if(!err && response.statusCode==200 && parsedData.cod==404){
            // console.log(body);
            console.log("Not found");
        }
        else{
            console.log("Not found");
            res.redirect("/");
        }
        // console.log(body);
    });
});

app.listen(3000, function(){
    console.log("Server for weather app has started...");
});