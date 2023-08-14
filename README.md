# Northcoders News API

Link to Hosted API: 
https://nc-news-api-tpln.onrender.com/

Description:
------------
This project serves as the backend for a news API called "be-nc-news." It provides endpoints to retrieve and interact with articles, comments, users, topics and a list of endpoints. The API facilitates the viewing of articles, comments, users and topics. Articles can be filtered by topic and sorted by creation time, number of votes and number of comments in ascending or descending order. Comments can be deleted and posted. Votes for articles can be updated. 

Available endpoints can be seen in endpoints.json. 

Technologies Used:
------------------
Node.js. Minimum Version: 20.1.0
Express.js
PostgreSQL. Minimum Version: 15.3 
Jest (for testing)
Supertest (for testing)


Installation:
-------------
Clone this repository.
Navigate to the project directory using the terminal.
Run npm install to install the required dependencies.

Usage:
------
Run npm start to start the server.
Tools like Insomnia, Postman and curl can be used to send requests to the available endpoints.
Refer to endpoints.json for each endpoint's usage and query parameters.

Database:
---------
To set up  the database, run "psql -f ./db/setup.sql".
To seed the database, run "node ./db/seeds/run-seed.js".
Testing
Run npm test to execute the tests.
The tests cover various scenarios for each endpoint and its expected behavior.
The test database is reseeded before each test. 

.env files
----------
To connect to the databases nc_news and nc_news_test in db/data, the following two files need to be created in your local repo's root directory:
File name: .env.test
File contents:   PGDATABASE=nc_news_test

File name: .env.development
File contents: PGDATABASE=nc_news

Run npm install and install other dependencies from the dependencies section in package.json for environment variables to be accessible in repo. 


Contributors:
-------------
Luke Ford

Contact:
--------
For any inquiries, please contact bluluke@hotmail.com