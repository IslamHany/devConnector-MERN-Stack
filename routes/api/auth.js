const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");

//POST api/auth
//@access Public
router.get("/", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//POST api/auth
//authenticate user & get token
//@access Public
//at post were are gonna check the credentials and respond with token
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors send a bad request
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try{
        //See if user exists
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
        }
        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 36000}, (err, token) => {
            if(err) throw err;
            res.json({token: token});
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
module.exports = router;