const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var newListItems = [];

app.get("/", function(req, res){

    var today = new Date();
    currDay = today.getDay();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-IN", options);


    res.render("List", {day: day,
        newListItems: newListItems
    });
    
})

app.post("/", function(req, res){

    newListItems.push(req.body.newItem);
    
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server running at port 3000");
})