# Northcoders News API

To connect to the databases nc_news and nc_news_test in db/data, the following two files need to be created in your local repo's root directory:
File name: .env.test
File contents:   PGDATABASE=nc_news_test

File name: .env.development
File contents: PGDATABASE=nc_news


Run npm install and install other dependencies from the dependencies section in package.json for environment variables to be accessible in repo. 
