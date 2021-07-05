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

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

const item1 = new Item({
    name:"Welcome"
});

const item2 = new Item({
    name:"to your"
});

const item3 = new Item({
    name:"list"
});

var defautlItems = [item1, item2, item3];

//var newListItems = [];
//var workItems = [];

app.get("/", function(req, res){

//    var day = date.getDate();


    Item.find(function(err, result){

        if(result.length ===0){
            Item.insertMany(defautlItems, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Succesfully added default items!");
                }
            })
            res.redirect("/");
        }
        else{
            res.render("List", {listHeading: "Today",
                newListItems: result
            });
        }
    });
})

app.post("/", function(req, res){

    let itemName = req.body.newItem;

    const item = new Item({
        name:itemName
    });

    item.save();
    res.redirect("/");

    // if(req.body.button === "Work"){
    //     workItems.push(item);
    //     res.redirect("/work");
    // }
    // else{
    //     newListItems.push(item);
    //     res.redirect("/");
    // }
    
})

app.get("/:customListName", function(req, res){
    const customListName =  req.params.customListName;
})

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndDelete(checkedItemId, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log(checkedItemId +" removed!");
        }
    });
    res.redirect("/");

})

app.get("/work", function(req, res){
    res.render("List", {listHeading: "Work List",
        newListItems: workItems
    })
})


app.listen(3000, function(){
    console.log("server running at port 3000");
})