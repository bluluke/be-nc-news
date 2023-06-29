const db = require("../db/connection");
const data = require('../db/data/test-data');
const seed =  require("../db/seeds/seed");
const request = require('supertest');
const app = require('../db/app');
const { toBeSortedBy } = require('jest-sorted');
const endpointsData = require("../endpoints.json");


beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
})


describe('GET /api/topics', () => { 
  test('200: responds with array of all topic objects with both slug and description properties', () => { 
    
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then((topics) => { 
      const { body } = topics;
      
      expect(body).toHaveLength(3);
      body.forEach((topic) => {
        expect(topic).toHaveProperty("slug", expect.any(String));
        expect(topic).toHaveProperty("description", expect.any(String));
    })
    })
  }); 
});

describe('GET /api', () => { 
  test('200: responds with object containing object/objects that represent each endpoint available', () => { 
   
    return request(app)
    .get("/api")
    .expect(200)
    .then((endpoints) => {
      expect(JSON.parse(endpoints.text)).toEqual(endpointsData);
    })  

  }); 
});


describe('GET /api/articles/:article_id', () => {
  test('200: responds with articleobject requested', () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then((articleData) => {
      const article = articleData.body[0];
      expect(article).toHaveProperty("author", expect.any(String));
      expect(article).toHaveProperty("title", expect.any(String));
      expect(article).toHaveProperty("article_id", 1);
      expect(article).toHaveProperty("body", expect.any(String));
      expect(article).toHaveProperty("topic", expect.any(String));
      expect(article).toHaveProperty("created_at", expect.any(String));
      expect(article).toHaveProperty("votes", expect.any(Number));
      expect(article).toHaveProperty("article_img_url", expect.any(String));
    })
  });
  test('404: ERROR returns message if id does not exist', () => { 
    return request(app)
    .get("/api/articles/100")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })
  });
  test('400: ERROR responds with an error when article_id is an invalid type', () => { 
    return request(app)
           .get("/api/articles/notanid")
           .expect(400)
           .then(({body}) => {
            expect(body.msg).toBe("Bad request")
           })
  });
})

describe('GET /api/articles', () => { 
  test('200: responds with array of article objects', () => { 
     
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(( articleData ) => {
     
      const body = articleData.body;
      expect(body).toHaveLength(13);
      expect([...body].reverse()).toBeSortedBy('created_at');
      body.forEach((article) => {
        expect(article).toHaveProperty("author", expect.any(String));
        expect(article).toHaveProperty("title", expect.any(String));
        expect(article).toHaveProperty("article_id", expect.any(Number));
        expect(article).toHaveProperty("topic", expect.any(String));
        expect(article).toHaveProperty("created_at", expect.any(String));
        expect(article).toHaveProperty("votes", expect.any(Number));
        expect(article).toHaveProperty("article_img_url", expect.any(String));
        expect(article).toHaveProperty("comment_count", expect.any(String));
  
      })
    })
  }); 
});

describe('/api/articles/:article_id/comments', () => { 
  test('200: should return array of comments for the given article_id, most recent comments first', () => { 
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then((data) => {
      const body = data.body.comments;
      expect(body).toHaveLength(11);
      expect(body).toBeSortedBy('created_at');
      body.forEach((comment) => {
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("votes", expect.any(Number));
        expect(comment).toHaveProperty("created_at", expect.any(String));
        expect(comment).toHaveProperty("author", expect.any(String));
        expect(comment).toHaveProperty("body", expect.any(String));
        expect(comment).toHaveProperty("article_id", expect.any(Number));
      })
    })
  }); 
  test('200: empty array when article_id has no associated comments', () => { 
    return request(app)
    .get('/api/articles/13/comments')
    .expect(200)
    .then((data) => {
      const body = data.body.comments;
      expect(body).toEqual([]);
    });
    
  });
  test('400: ERROR responds with an error when article_id is an invalid type', () => { 
    return request(app)
           .get('/api/articles/notAnId/comments')
           .expect(400)
           .then(({body}) => {
            expect(body.msg).toBe("Bad request")
           })
  });
  test('404: ERROR returns message if article id does not exist', () => { 
    return request(app)
    .get('/api/articles/91/comments')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })
  });
});

describe('POST /api/articles/:article_id/comments', () => { 
  test('201: responds with new comment object after being added to db', () => { 
   const newComment = {
    username: 'butter_bridge',
    body: 'I love this article more than baclava.'
   };
   return request(app)
   .post("/api/articles/8/comments")
   .send(newComment)
   .expect(201)
   .then((response) => {
    const comment = response.body.comment[0];
    expect(comment.comment_id).toBe(19);
    expect(comment.body).toBe('I love this article more than baclava.');
    expect(comment.article_id).toBe(8);
    expect(comment.author).toBe('butter_bridge')
    expect(comment.votes).toBe(0);
   });
  }); 
  test('400: ERROR responds with an error when article_id is an invalid type', () => { 
    return request(app)
           .post('/api/articles/notAnId/comments')
           .expect(400)
           .then(({body}) => {
            expect(body.msg).toBe("Bad request")
           })
  });
  test('404: ERROR returns message if article_id does not exist', () => { 
    const newComment = {
      username: 'butter_bridge',
      body: 'I love this article more than baclava.'
     };
    return request(app)
    .post('/api/articles/91/comments')
    .send(newComment)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })
  });
  test('404: ERROR returns message if username does not exist', () => { 
    const newComment = {
      username: 'Boromir',
      body: 'I love this article more than Minas Tirith.'
     };
    return request(app)
    .post('/api/articles/1/comments')
    .send(newComment)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })
  });
});


