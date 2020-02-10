const express = require('express');
const passport = require('passport');
const authenticate = require('../authenticate');
const Users = require('../models/users');
const logger = require('../config/winston');

const router = express.Router();

router.use(express.json());

router.route('/').all((req,res,next) => {
    logger.info('Routing users /');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    logger.info('Routing GET users - returns users collection');
    Users.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
router.post('/signup', (req, res, next) => {
    logger.info('Routing POST SIGNUP - creates the user');
    Users.register(new Users({username: req.body.username}), 
                    req.body.password, (err, user) => {
        if (err) {
            logger.info('Could not create user');
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');   
            res.json({err: err}) ;
        } else {
            logger.info('User created successfully');

            passport.authenticate('local')(req, res, () => {
                logger.info('User authenticated successfully');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'User registered successfully'});        
            });
        }
    });
});
router.get('/login', passport.authenticate('local'), (req, res) => {
    logger.info('Routing GET LOGIN - authenticates the user');
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'User successfully logged in'});
});
router.get('/login/facebook', passport.authenticate('facebook-token'), (req, res) => {
    logger.info('Routing GET LOGIN/FACEBOOK - authenticates the user');
    if (req.user) {
        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, status: 'User successfully logged in'});
    }
});

module.exports = router;