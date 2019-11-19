const request = require('supertest');
const Post = require('../../models/post');
const mongoose = require('mongoose');


let server;
describe('/feed',() => {
    beforeEach(() => { 
        server = require('../../app');
    })
    afterEach(async () => { 
        server.close();
        await Post.remove({});
    })
    describe('GET /posts', () =>{
        it('should return all posts', async () => {
           await Post.collection.insertMany([
                {title: "First post", imageUrl: "image/url", content: "This ia a post", creator: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')},
                {title: "Second post", imageUrl: "image/url2", content: "This ia a second post", creator: mongoose.Types.ObjectId('4edd40c86762e0fb12000004')}
            ]);

            const res = await request(server).get('/feed/posts');
            console.log(res.body);
        
            expect(res.status).toBe(200);
            expect(res.body.posts.length).toBe(2);
            expect(res.body.posts.some(post => post.title === "First post")).toBeTruthy();
            expect(res.body.posts.some(post => post.title === "Second post")).toBeTruthy();

        });
    });
});