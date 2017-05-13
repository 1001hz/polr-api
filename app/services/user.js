var crypto = require('crypto');
var User = require('../models/user');

module.exports = {

    getUserByToken: function(token) {
        return User.findOne({ token: token }).exec();
    },

    logout: function(userId) {
        return User
                .findOne({ _id: userId })
                .exec()
                .then(function(user) {
                    user.token = null;
                    return user.save();
                });
    },

    login: function(username, password) {
        return User
            .findOne({ username: username })
            .exec()
            .then(function(aUser){
                if(!aUser) {
                    throw({status: 422, message: "User doesn't exist"});
                }
                else {
                    if(aUser.comparePassword(password)){
                        aUser.setToken();
                        return aUser.save();
                    }
                    else {
                        throw({status: 401, message: "Incorrect credentials"});
                    }
                }
            });
    },

    create: function(username, password) {
        return User.findOne({ username: username })
                .select('id')
                .exec()
                .then(function(aUser){
                    if(aUser){
                        throw({status: 422, message: "User already exists"});
                    } else {

                        var passwordHash = crypto.createHash('sha256').update(password).digest('hex');

                        var newUser = new User({
                            username: username,
                            password: passwordHash
                        });

                        newUser.setToken();

                        return newUser.save().then(function(createdUser){
                            // hide password
                            createdUser.password = null;
                            return createdUser;
                        });

                    }
                });
    },

    update: function(user) {
        return User
            .findOne({ _id: user.id })
            .exec()
            .then(function(aUser){
                var query = { _id: user.id };
                var updateFields = aUser.updateFields(user);
                var options = {new: true};
                return User.findOneAndUpdate(query, updateFields, options).exec();
            });
    },

    updatePassword: function(user, currentPassword, newPassword) {
        return User
            .findOne({ _id: user.id })
            .exec()
            .then(function(aUser){
                if(aUser.comparePassword(currentPassword)){
                    aUser.password = crypto.createHash('sha256').update(newPassword).digest('hex');
                    return aUser.save();
                }
                else {
                    throw({status: 422, message: "Password is incorrect"});
                }
            });
    }
};