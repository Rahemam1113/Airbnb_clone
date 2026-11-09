const express = require("express");//importing express
const app = express();//using express
const mongoose = require("mongoose");//importing mongoose
const Listing = require("./models/listing.js");//importing listing.js 
const path = require("path");//importing path
const methodOverride = require("method-override");//importing methodoverride
const ejsMate = require("ejs-mate");//importing ejsmate which make the template easier

//when working locally use this "mongodb://127.0.0.1:27017/wanderlust"
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const MONGO_URL = "mongodb+srv://mdhameed47gh_db_user:GdGXsVqPWwJouh9O@cluster0.wrruvld.mongodb.net/"; //stores the MongoDB connection address in a constant named MONGO_URL
const MONGO_URL = process.env.MONGODB_URI;

main()//this main is called for the connection to. establish 
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});//handling error

async function main(){
    await mongoose.connect(MONGO_URL);//connection to the mongo db 
}

app.set("view engine", "ejs"); //setting up view engine which help dynamically update on ejs
app.set("views", path.join(__dirname,"views"))//this sets the path  to views folder
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));//this serves the css files / static files from public folder

// app.get("/", (req,res) => {
//     res.send("This is Root");//an API 
// })

// app.get("/testListing", async (req,res)=>{// this is a async function 
//     let sampleListing = new Listing({    //creating a sample data which saves into the table or collection
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calungute, Goa",
//         country: "India"
//     });

//     await sampleListing.save(); //here it waits and saves into the collection(table)
//     console.log("sample was saved");
//     res.send("successful testing");
// });

//index route
app.get("/listings",async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
});

//New route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create new route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//update route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id/", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// app.listen(8080, () => {
//     console.log("server is active");//this make a port 
// });
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`);
});

