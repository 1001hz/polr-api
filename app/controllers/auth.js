var userService = require('../services/user');

module.exports = {

    login: function(req, res, next){
        userService
            .login(req.body.username, req.body.password)
            .then(function(user){
                res.json(user);
            })
            .catch(function(error) {
                return next(error);
            })
    },

    logout: function(req, res, next){
        userService
            .logout(req._user._id)
            .then(function(){
                res.json({});
            })
            .catch(function(error) {
                return next(error);
            })
    },

    tokenLogin: function(req, res, next){
        userService
            .tokenLogin(req.body.token)
            .then(function(user){
                res.json(user);
            })
            .catch(function(error) {
                return next(error);
            })
    },

    forgotPassword: function(req, res, next) {
        userService
            .forgotPassword(req.body)
            .then(function(user){
                res.json(user);
            })
            .catch(function(error) {
                return next(error);
            })
    }

}