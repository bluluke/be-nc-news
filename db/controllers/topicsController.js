

const { selectTopics } = require('../models/topicsModel')

exports.getTopics = (req, res, next) => {
  
    selectTopics().then((topics) => {

        res.status(200).send(topics);
    })

};