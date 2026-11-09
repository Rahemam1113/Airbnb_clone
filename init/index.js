const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //stores the MongoDB connection address in a constant named MONGO_URL

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

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();