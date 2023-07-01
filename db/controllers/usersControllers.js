const { selectUsers } = require("../models/usersModel")


exports.getUsers = (req, res, next) => {
    selectUsers().then((usersArray) => {
        res.status(200).send({ users: usersArray });
    })

}