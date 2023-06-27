const db = require("../db/connection");
const data = require('../db/data/test-data');
const seed =  require("../db/seeds/seed");
const request = require('supertest');
const app = require('../db/app');
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
      expect(article).toHaveProperty("article_id", expect.any(Number));
      expect(article).toHaveProperty("body", expect.any(String));
      expect(article).toHaveProperty("topic", expect.any(String));
      expect(article).toHaveProperty("created_at", expect.any(String));
      expect(article).toHaveProperty("votes", expect.any(Number));
      expect(article).toHaveProperty("article_img_url", expect.any(String));
    })
  })
  test('200: responds with articleobject requested', () => {
    return request(app)
    .get("/api/articles/3")
    .expect(200)
    .then((articleData) => {
      const article = articleData.body[0];
      expect(article).toHaveProperty("author", expect.any(String));
      expect(article).toHaveProperty("title", expect.any(String));
      expect(article).toHaveProperty("article_id", expect.any(Number));
      expect(article).toHaveProperty("body", expect.any(String));
      expect(article).toHaveProperty("topic", expect.any(String));
      expect(article).toHaveProperty("created_at", expect.any(String));
      expect(article).toHaveProperty("votes", expect.any(Number));
      expect(article).toHaveProperty("article_img_url", expect.any(String));
    })
  })
  test('404: ERROR returns message if id does not exist', () => { 
    return request(app)
    .get("/api/articles/100")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })
  });
  test('404: ERROR returns message if id does not exist', () => { 
    return request(app)
    .get("/api/articles/50")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })
  });
})

