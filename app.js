const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname+ "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name:String
};

const Item = mongoose.model("Item", itemsSchema);

var newListItems = [];
var workItems = [];

app.get("/", function(req, res){

//    var day = date.getDate();
    res.render("List", {listHeading: "Today",
        newListItems: newListItems
    });
    
})

app.post("/", function(req, res){

    let item = req.body.newItem;

    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        newListItems.push(item);
        res.redirect("/");
    }
    
})

app.get("/work", function(req, res){
    res.render("List", {listHeading: "Work List",
        newListItems: workItems
    })
})


app.listen(3000, function(){
    console.log("server running at port 3000");
})