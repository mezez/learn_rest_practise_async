const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

//GET /feed/posts
//router.get('/posts', isAuth,  feedController.getPosts);
router.get('/posts',  feedController.getPosts);
router.post('/post', isAuth, [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
], feedController.createPosts);
router.get('/post/:postId', isAuth, feedController.getSinglePost);
// router.put('/post/:postId', [
//     body('title').trim().isLength({min: 5}),
//     body('content').trim().isLength({min: 5})
// ], feedController.updatePost);
router.post('/post/:postId', isAuth, [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
], feedController.updatePost);
//router.put('/post/:postId', feedController.deletePost);
router.post('/delete-post/:postId', isAuth, feedController.deletePost);

module.exports = router;