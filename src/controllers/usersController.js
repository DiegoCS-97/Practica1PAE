const {User} = require('../models/index')


class UsersController{
    findUser(user){
        User.find({
            username:user
         }, (err, results) => {
             if(results){
                console.log(results);
             } else {
                 console.log('Failed to find: ', err);
             }
         });
    }

    addNewUser(user){
        User.insert({
            username:user.username,
            email:user.email,
            password:user.password
         }, (err, results) => {
             if(results){
                console.log(results);
             } else {
                 console.log('Failed to insert: ', err);
             }
         });
    }
}

module.exports = UsersController;