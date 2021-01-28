// import express
const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel"); 
// Create a new router to handle internal routes
const router = express.Router();

// session
router.get("/save-something-in-session", (request, response) => {
    request.session.testProperty = "testing that this string gets saved";
    response.send("ok");
    });

router.get("/retrieve-session-value", (request, response) => {
    response.send(request.session.testProperty);
});

router.get("/expire-session", (request, response) => {
    request.session.destroy(() => response.send("OK"));
});

router.post("/login", (request, response) => {
    UserModel.findOne({username: request.body.username}).then((userData) => {
        // does the user exist?
        if(userData){
            const checkHashPassword = bcrypt.compareSync(request.body.password, userData.password);
            // if they exist does their password work?
            if(checkHashPassword){
                console.log('request.session', request.session);
                // add another key to session object to give user id for session
                request.session.user = {
                    id: userData._id,
                };
                console.log('request.session', request.session);
                response.send('logged in');
            } else {
                response.status(401).send('wrong credentials');
            }
        } else {
            response.status(401).send('wrong credentials user');
        }
    });
});

router.get("/logout", (request, response) => {
    request.session.loggedIn = false;
    response.send("User has logged-out.");
});

router.post("/register", (request, response) => {
    const body = request.body; 
    // 'body' should have username and password because based on userSchema object in UserModel
    console.log('user registration body.', body);
    const passwordHash = bcrypt.hashSync(body.password, 10);
    console.log('password Hash', passwordHash);
    const user = { username: body.username, password: passwordHash }; 
    console.log('user:', user);

    UserModel.create(user).then((userData) => {
        response.send(userData);
    });
});

module.exports = router;