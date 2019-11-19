const express = require('express');
const { body, check } = require('express-validator');
const router = express.Router();

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');


router.post('/signup', [
    check('email').isEmail().normalizeEmail().custom((value, { req }) => {
        
        return User.findOne({ email: value }).then(userDoc => {
            // A user already exists with the email
            if (userDoc) {
                //return new Promise.reject(new Error('Email exists already'));
                let promise = new Promise( (resolve, reject) =>{
                    reject(new Error('Email exists already'));
                });

                return promise;
            }
        });
    }).withMessage('Please enter a valid email'),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty()
], authController.signup);
router.post('/login',authController.login);
router.get('/status',isAuth, authController.status);
router.post('/status', isAuth, [
    body('status').trim().isLength({min: 2}),
],  authController.updateStatus);

module.exports = router;