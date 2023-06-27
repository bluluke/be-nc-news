const db = require('../connection');

exports.selectAllArticles = (req) => {
    const articleId =  Object.values(req.params);
    return db
        .query("SELECT * FROM articles WHERE article_id = $1;", articleId)
        .then((articleObject) => {
            return articleObject.rows;
        })
    
}





/*
  '_readableState',   '_events',
      '_eventsCount',     '_maxListeners',
      'socket',           'httpVersionMajor',
      'httpVersionMinor', 'httpVersion',
      'complete',         'rawHeaders',
      'rawTrailers',      'joinDuplicateHeaders',
      'aborted',          'upgrade',
      'url',              'method',
      'statusCode',       'statusMessage',
      'client',           '_consuming',
      '_dumped',          'next',
      'baseUrl',          'originalUrl',
      '_parsedUrl',       'params',
      'query',            'res',
      'route'
      */