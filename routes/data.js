var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');

var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var id = '';

router.post('/addFamilyMember', function(req, res) {

    var results=[];

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
        client.query('INSERT INTO medications (medication_name, family_member_id, dosage, frequency, date_started, ' +
            'date_stopped, physician, reason, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
            [req.body.medication_name, req.body.family_member_id, req.body.dosage, req.body.frequency, req.body.date_started,
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
        client.query('INSERT INTO visits (family_member_id, visit_type, location, reason, visit_date, ' +
            'discharge_date, treatment, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
            [req.body.family_member_id, req.body.visit_type, req.body.location, req.body.reason, req.body.visit_date,
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
        client.query('INSERT INTO statistics (family_member_id, feet, inches, weight, date_of_birth, ' +
            'physician, physician_phone, physician_street_1, physician_street_2, physician_city, ' +
            'physician_state, physician_zip, blood_type, med_allergies, notes) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);',
            [req.body.family_member_id, req.body.feet, req.body.inches, req.body.weight, req.body.date_of_birth,
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

router.get('/familyMembers/*', function(req, res) {

    var results = [];
    var id = req.params[0];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM family_members WHERE user_id = $1;',
        [id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            console.log('family member results: ', results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.get('/familyMember/*', isAuthorized, function(req, res) {

    var results = [];
    var id = req.params[0];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM family_members WHERE family_member_id = $1;',
            [id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            console.log('family member results: ', results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.get('/medications/*', isAuthorized, function(req, res) {

    var id = req.params[0];
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM medications ' +
            'JOIN family_members ON family_members.family_member_id = medications.family_member_id ' +
            'WHERE family_members.family_member_id = $1;',
            [id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.get('/statistics/*', isAuthorized, function(req, res) {

    var id = req.params[0];
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM statistics ' +
            'JOIN family_members ON family_members.family_member_id = statistics.family_member_id ' +
            'WHERE family_members.family_member_id = $1;',
            [id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.get('/visits/*', isAuthorized, function(req, res) {

    var id = req.params[0];
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM visits ' +
            'JOIN family_members ON family_members.family_member_id = visits.family_member_id ' +
            'WHERE family_members.family_member_id = $1;',
            [id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.delete('/familyMember/*', function(req, res) {
    var results = [];

    var id = req.params[0];

    pg.connect(connection, function(err, client, done) {
        client.query('DELETE FROM family_members WHERE family_member_id = ($1);',
            [id],

            function(err, results) {
                done();
                if(err) {
                    console.log('Error deleting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });

    });
});

router.delete('/medication/*', function(req, res) {
    var results = [];

    var id = req.params[0];

    pg.connect(connection, function(err, client, done) {
        client.query('DELETE FROM medications WHERE medication_id = ($1);',
            [id],

            function(err, results) {
                done();
                if(err) {
                    console.log('Error deleting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });

    });
});

router.delete('/visit/*', function(req, res) {
    var results = [];

    var id = req.params[0];

    pg.connect(connection, function(err, client, done) {
        client.query('DELETE FROM visits WHERE visit_id = ($1);',
            [id],

            function(err, results) {
                done();
                if(err) {
                    console.log('Error deleting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });

    });
});

// checks to see if user is authorized to view family member
function isAuthorized(req, res, next) {
    pg.connect(connection, function(err, client, done) {
        var user_id = req.user.user_id;
        var family_member_id = req.params[0];
        console.log('isAuthorized user_id: ', user_id);
        console.log('isAuthorized family_member_id: ', family_member_id);
        var results = [];

        var query = client.query('SELECT * FROM family_members WHERE family_member_id = $1 AND user_id = $2;',
            [family_member_id, user_id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            console.log(results);

            if(results.length == 1) {
                return next();
            }
            console.log('NOPE!');
            res.sendStatus(403);
        });

        if(err) {
            console.log(err);
        }

    });
}

module.exports = router;
