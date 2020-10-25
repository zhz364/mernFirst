const express = require("express");
const router = express.Router();
const passport = require("passport");
const ValidateTweetInput = require("../../validation/tweets");
const Tweet = require("../../models/Tweet");

router.get("/test", (req,res) =>{
    res.json({ msg: "This is the tweets route"});
})

router.get("/", (req,res) =>{
    Tweet.find()
        .sort({date: -1})
        .then(tweets =>res.json(tweets))
        .catch(err => res.status(400).json(err))
})

router.get("/user/:userId", (req,res)=>{
    Tweet.find({user: req.params.userId})
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json(err))

})

router.get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No tweet found with that ID' })
        )
})


router.post("/",
    passport.authenticate("jwt", {session:false}),
    (req,res) => {
        const { errors, isValid } = ValidateTweetInput(req.body);
        if(!isValid){
            return res.status(400).json(errors)
        }
        const newTweet = new Tweet({
            user: req.user.id,
            text: req.body.text
        })
        newTweet.save()
            .then(tweet => res.json(tweet));
    }
)


module.exports = router;