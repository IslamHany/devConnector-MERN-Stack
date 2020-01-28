const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const User = require("../../models/User");

//POST api/users
//register user
//@access Public
router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with six or more chrachters").isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors send a bad request
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;
    try{
        //See if user exists
        let user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({error: [{msg: "User already exists"}]});
        }
        //Get users gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        });
        user = new User({
            name: name,
            email: email,
            avatar: avatar,
            password: password
        });
        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
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