var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
    //console.log('register.js post request');
    //console.log('password: ', req.body.password);
    var saveUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: encryptLib.encryptPassword(req.body.password),
        username: req.body.username

    };
    //console.log('new user:', saveUser);

    pg.connect(connection, function(err, client, done) {

        if(err) {
            console.log("Error connecting: ", err);
            next(err);
        } else {
            //res.redirect('/'); commenting this out because it's breaking things
        }

        client.query("INSERT INTO users (first_name, last_name, password, username) VALUES ($1, $2, $3, $4) RETURNING user_id",
            [saveUser.first_name, saveUser.last_name, saveUser.password, saveUser.username],
            function (err, result) {
                done();

                if(err) {
                    console.log("Error inserting data: ", err);
                    next(err);
                } else {
                    user_id = result.rows[0].user_id;
                    console.log('user id on the server: ', result.rows[0].user_id);
                    res.redirect('/success.html'); //commenting this out because it's breaking things
                }
            });
    });

});


module.exports = router;