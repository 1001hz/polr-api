var League = require('../models/league');
var UserService = require('./user');

module.exports = {

    create: function(_userId, leagueData) {

        var newLeague = new League({
            ownerId: _userId,
            name: leagueData.name,
            startDate: leagueData.startDate,
            frequency: leagueData.frequency,
            mediaType: leagueData.mediaType,
            members: [
                {
                    userId: _userId
                }
            ]
        });

        return newLeague.save()
            .then(function(league) {

                return UserService.addLeague(_userId, league._id)
                    .then(function() {
                        return league;
                    });
            });
    },

    findById: function(leagueId) {
        return League
                .findOne({ _id: leagueId })
                .exec();
    },

    fetchAllForUser: function(user) {
        var leagueIds = user.leagues.map(function(league){
            return league.leagueId;
        });

        return League
            .find({'_id': { $in: leagueIds}}).exec();
    },

    joinLeague: function(user, leagueId) {
        return League
            .findOne({ _id: leagueId })
            .exec()
            .then(function(league) {

                league.members.push({
                    userId: user._id
                });

                return league.save()
                    .then(function(league){

                        return UserService.addLeague(user._id, leagueId)
                            .then(function() {
                                return league;
                            });
                    });
            });

    }
};