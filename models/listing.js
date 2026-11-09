const mongoose = require("mongoose");//importing mongoose
const Schema = mongoose.Schema;

const listingSchema = new Schema ({// this is a schema for the table (like column names)
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo",
        set: (v) => 
            v === "" 
              ? "https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo"
              : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);//Listing is the name of the table and listingSchema is the attributes name in the table 
module.exports = Listing;  //creates a module
