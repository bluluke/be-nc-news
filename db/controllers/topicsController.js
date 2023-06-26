

const { selectTopics } = require('../models/topicsModel')

exports.getTopics = (req, res, next) => {
    console.log(req, 'req in controller');
    selectTopics().then((topics) => {

        res.status(200).send(topics);
    })

};