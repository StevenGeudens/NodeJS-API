const jwt = require("jsonwebtoken");
const express = require("express");
const users = require('./models/user');
const router = express.Router();

router.post('/user/auth', async (req, res) => {
      console.log('/user/auth route called');
        users.findOne({email: req.body.email}, function(error, user) {
          if (error) res.status(401).send(error);
          else{
            if (!user || !req.body.password || user.password != req.body.password) 
                res.status(401).send("Invalid user or password");
            else {
              console.log(user.permissionlevel);
              const token = jwt.sign({
                id: user.email,
                roles: user.permissionlevel,
                },"jwtPrivateKey",{expiresIn: "15m"});
              res.status(200).send("Token: " + token );
              }
            }
      })
   }
  );
module.exports = router;