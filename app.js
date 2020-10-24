
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db=require("./confg/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");


mongoose
    .connect(db, {useNewUrlParser:true})
    .then(() => console.log("Connnected to mongoDB"))
    .catch(err => console.log(err));

app.get("/", (req, res) =>{
    // debugger
    console.log(res);
    res.send("Wolves gravesto");

})

app.use("/api/users", users);
app.use("/api/tweets", tweets);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));