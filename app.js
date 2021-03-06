
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db=require("./confg/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const passport = require('passport');
const bodyParser = require('body-parser');

const User = require('./models/User');

mongoose
    .connect(db, {useNewUrlParser:true})
    .then(() => console.log("Connnected to mongoDB"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require("./confg/passport")(passport);

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    const user = new User({
        handle: "jim",
        email:"@@",
        password:"password"
    })
    user.save()
    res.send("Wolves gravesto");

})

app.use("/api/users", users);
app.use("/api/tweets", tweets);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));