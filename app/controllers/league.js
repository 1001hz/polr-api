var leagueService = require('../services/league');

module.exports = {

    create: function(req, res, next){
        leagueService
            .create(
                req._user._id,
                req.body
            )
            .then(function(league){
                res.json(league);
            })
            .catch(function(error) {
                return next(error);
            })
    },

    findById: function(req, res, next) {
        leagueService
            .findById(req.body.leagueId)
            .then(function(league){
                res.json(league);
            })
            .catch(function(error) {
                return next(error);
            })
    },

    fetch: function(req, res, next) {
        leagueService
            .fetchAllForUser(req._user)
            .then(function(leagues){
                res.json(leagues);
            })
            .catch(function(error) {
                return next(error);
            })
    },

    joinLeague: function(req, res, next) {
        leagueService
            .joinLeague(req._user, req.body.leagueCode)
            .then(function(leagues){
                res.json(leagues);
            })
            .catch(function(error) {
                return next(error);
            })
    }

}