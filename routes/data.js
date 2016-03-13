var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');

var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.post('/addFamilyMember', function(req, res) {
    var results=[];
    //console.log('user_id in addFamilyMember route: ', req.body.user_id);

    pg.connect(connection, function(err, client, done) {
        client.query('INSERT INTO family_members (user_id, first_name, last_name) VALUES ($1, $2, $3);',
            [req.body.user_id, req.body.first_name, req.body.last_name],
            function(err, results) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });
    });
});

router.post('/medication', function(req, res) {
    var results=[];

    pg.connect(connection, function(err, client, done) {
        client.query('INSERT INTO medications (medication_name, dosage, frequency, date_started, ' +
            'date_stopped, physician, reason, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
            [req.body.medication_name, req.body.dosage, req.body.frequency, req.body.date_started,
                req.body.date_stopped, req.body.physician, req.body.reason, req.body.notes],
            function(err, results) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });
    });
});

router.post('/visit', function(req, res) {
    var results=[];

    pg.connect(connection, function(err, client, done) {
        client.query('INSERT INTO visits (visit_type, location, reason, visit_date, ' +
            'discharge_date, treatment, notes) VALUES ($1, $2, $3, $4, $5, $6, $7);',
            [req.body.visit_type, req.body.location, req.body.reason, req.body.visit_date,
                req.body.discharge_date, req.body.treatment, req.body.notes],
            function(err, results) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });
    });
});

router.post('/statistic', function(req, res) {
    var results=[];

    pg.connect(connection, function(err, client, done) {
        client.query('INSERT INTO statistics (feet, inches, weight, date_of_birth, ' +
            'physician, physician_phone, physician_street_1, physician_street_2, physician_city, ' +
            'physician_state, physician_zip, blood_type, med_allergies, notes) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);',
            [req.body.feet, req.body.inches, req.body.weight, req.body.date_of_birth,
                req.body.physician, req.body.physician_phone, req.body.physician_street_1,
                req.body.physician_street_2, req.body.physician_city, req.body.physician_state,
                req.body.physician_zip, req.body.blood_type, req.body.med_allergies, req.body.notes],
            function(err, results) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });
    });
});

router.get('/user', function(req, res) {
    console.log('made it to the data.js user route');

    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM users WHERE user_id = $1',
            [3]); // need to dynamically generate or pass in the user_id - now it is hard coded

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            //console.log(results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.get('/familyMember', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM family_members WHERE user_id = $1;',
        ['3']);  // need to dynamically generate or pass in the user_id - now it is hard coded

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            //console.log(results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

//router.delete('/*', function(req, res) {
//    var results = [];
//
//    var id = req.params[0]; // - first request
//    console.log('id: ', id);
//
//
//    pg.connect(connectionString, function(err, client, done) {
//        client.query('DELETE FROM favorites WHERE api_id = ($1);',
//            [id],
//
//            function(err, results) {
//                done();
//                if(err) {
//                    console.log('Error deleting data: ', err);
//                    res.send(false);
//                } else {
//                    //console.log(id);
//                    res.send(results);
//                }
//            });
//
//    });
//});


module.exports = router;
