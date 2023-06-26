const db = require("../db/connection");
const data = require('../db/data/test-data');
const seed =  require("../db/seeds/seed");
const request = require('supertest');
const app = require('../db/app');

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
    })
  }); 
});


