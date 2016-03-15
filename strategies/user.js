var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

passport.serializeUser(function(user, done) {
    done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {

    //console.log('called deserializeUser');
    pg.connect(connection, function (err, client) {

        var user = {};
        //console.log('called deserializeUser - pg');
        var query = client.query("SELECT * FROM users WHERE user_id = $1", [id]);

        //event to listen for a row, put it in an empty object called user
        query.on('row', function (row) {
            //console.log('User row', row);
            user = row;
            done(null, user);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

// Does actual work of logging in
passport.use('local', new localStrategy({
        passReqToCallback: true,
        usernameField: 'username'
    }, function(req, username, password, done){
        pg.connect(connection, function (err, client) {
            //console.log('called local - pg');
            var user = {};
            var found = false;
            var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

            query.on('row', function (row) {
                //console.log('User obj', row);
                found = true;
                user = row;

                // Hash and compare
                if(encryptLib.comparePassword(password, user.password)) {
                    // all good!
                    console.log('matched user: ', user);
                    done(null, user);
                } else {
                    //console.log('nope');
                    done(null, false, {message: 'Incorrect credentials.'});
                }

            });

            // After all data is returned, close connection and return results
            query.on('end', function () {
                client.end();
                if(found == false) {
                    done(null, false, {message: 'User not found'});
                }
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }
        });
    }
));

module.exports = passport;
