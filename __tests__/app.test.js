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
describe('GET /api/articles?topic=mitch', () => { 
  test('200: returns array of article objects with the topic mitch', () => { 
    return request(app)
    .get('/api/articles?topic=mitch')
    .expect(200)
    .then(({ body }) => {
      const mitchArticles = body;
      
      expect(mitchArticles).toHaveLength(12);
      mitchArticles.forEach((article) => {
        expect(article).toHaveProperty("author", expect.any(String));
      expect(article).toHaveProperty("title", expect.any(String));
      expect(article).toHaveProperty("article_id", expect.any(Number));
      expect(article.topic).toBe('mitch')
      expect(article).toHaveProperty("created_at", expect.any(String));
      expect(article).toHaveProperty("votes", expect.any(Number));
      expect(article).toHaveProperty("article_img_url", expect.any(String));
      expect(article).toHaveProperty("comment_count", expect.any(String));
      })
    })
  }); 
  test('200: responds', () => {
    return request(app)
    .get('/api/articles?topic=paper')
    .expect(200)
    .then(({ body}) => {
      expect(body).toEqual([]);
    })
  })
  test('404: responds with message if topic does not exists', () => { 
    return request(app)
      .get('/api/articles?topic=apple')
      .expect(404)
      .then(({ body}) => {
        expect(body.msg).toBe('Not found');
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
  test('201: responds with new correctly formed comment object even if there are unnecessary properties in request object', () => { 
    const newComment = {
      username: 'butter_bridge',
      body: 'I enjoyed it.',
      notNeeded: 'This prop is not needed.'
     };
     return request(app)
      .post("/api/articles/8/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        const comment = response.body.comment[0];
        expect(comment.comment_id).toBe(19);
        expect(comment.body).toBe('I enjoyed it.');
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

  test('400: ERROR returns message if req body has wrong key', () => { 
    const newComment = {
      name: 'butter_bridge',
      body: 'I love this article more than butter.'
     };
    return request(app)
    .post('/api/articles/1/comments')
    .send(newComment)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
  
  test('400: ERROR returns message if req body has missing key', () => { 
    const newComment = {
      username: 'butter_bridge'
     };
    return request(app)
    .post('/api/articles/1/comments')
    .send(newComment)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
});
describe('PATCH /api/articles/:article_id', () => { 
  test('200: responds with updated article', () => { 
   const incVote = { inc_votes : 2};

   return request(app)
   .patch("/api/articles/1")
   .send(incVote)
   .expect(200)
   .then((response) => {
    const article = response.body.article[0];

    expect(article.author).toBe("butter_bridge");
    expect(article.topic).toBe('mitch');
    expect(article.body).toBe("I find this existence challenging");
    expect(article.votes).toBe(102);
    expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
    expect(article.article_id).toBe(1);
    expect(article.created_at).toBe('2020-07-09T20:11:00.000Z');
    expect(article.title).toBe("Living in the shadow of a great man");
   });
  });
  test('200: responds with updatedArticle even if request object has additional unnecessary property', () => { 
    const incVote = { inc_votes : 2, notNeeded: 300};

    return request(app)
    .patch("/api/articles/1")
    .send(incVote)
    .expect(200)
    .then((response) => {
    const article = response.body.article[0];

    expect(article.author).toBe("butter_bridge");
    expect(article.topic).toBe('mitch');
    expect(article.body).toBe("I find this existence challenging");
    expect(article.votes).toBe(102);
    expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
    expect(article.article_id).toBe(1);
    expect(article.created_at).toBe('2020-07-09T20:11:00.000Z');
    expect(article.title).toBe("Living in the shadow of a great man");
    });
  });
  test('400: ERROR responds with an error when article_id is invalid', () => { 
    const incVote = { inc_votes : 5};

    return request(app)
    .patch("/api/articles/notid")
    .send(incVote)
    .expect(400)
    .then(({ body }) => {
    expect(body.msg).toBe("Bad request")
    })
  });  
  test('404: ERROR returns message if article_id does not exist', () => { 
    const incVote = { inc_votes : 5};
    return request(app)
    .patch('/api/articles/62')
    .send(incVote)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })
  });
  test('400: ERROR responds with message if reqest body has invalid key', () => { 
    const incVote = { sink_vote : 7};
    return request(app)
    .patch('/api/articles/1')
    .send(incVote)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
  test('400: ERROR responds with message if reqest body empty', () => { 
    const incVote = {};
    return request(app)
    .patch('/api/articles/1')
    .send(incVote)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
});
describe('DELETE /api/comments/:comment_id', () => { 
  test('204: no content', () => { 
    return request(app)
    .delete("/api/comments/1")
    .expect(204)
    .then((response) => {
      expect(response.body).toEqual({});
      return db
      .query('SELECT * FROM comments WHERE comment_id = 1')
      .then((response) => {
        expect(response.rows.length).toBe(0);
      })
    })   
  }); 
  test('404: comment_id does not exist', () => { 
    return request(app)
    .delete("/api/comments/199")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    })

  });
  test('400: comment_id not valid type', () => { 
    return request(app)
    .delete("/api/comments/apple")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    });
  })
});
describe('GET /api/users', () => { 
  test('200: responds with array of all user objects', () => { 
    
    return request(app)
    .get('/api/users')
    .expect(200)
    .then((response) => {
      const { users } = response.body;
      
      expect(users).toHaveLength(4);
      users.forEach((user) => {
        expect(user).toHaveProperty("username", expect.any(String));
        expect(user).toHaveProperty("name", expect.any(String));
        expect(user).toHaveProperty("avatar_url", expect.any(String));
      })
    })
  }); 
});
