const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../confg/keys');
const jwt = require('jsonwebtoken');
const passport = require("passport");

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require("../../validation/login")



router.get("/test", (req,res) =>{
    res.json({ msg: "This is the user route"});
})

router.post('/register', (req,res)=>{
    const { errors, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email})
    .then(user =>{
        if (user){
            return res.status(400).json({email: "A user is already registered with that email"})
        } else{
            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email,
                password: req.body.password
            })

            // newUser.save().then(user => res.send(user)).catch(err => res.send(err));
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: "This user does not exist."})
            }
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        const payload ={
                            id:user.id,
                            handle: user.handle,
                            email: user.email,

                        }
                        jwt.sign(
                            payload,
                            keys.secreOrKey,
                            {expiresIn: 3600},
                            (err,token) =>{
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                        )
                        // res.json({msg: "Success!"})
                    }else{
                        return res.status(400).json({password: "Incorrect password"});
                    }
                })
        })
})

module.exports = router;