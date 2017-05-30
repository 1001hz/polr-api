var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MembersSchema = new Schema({
    userId: { type: String }
});

var LeagueSchema = new Schema({
    name: { type: String, required: true },
    startDate: { type: String, required: true },
    frequency: { type: String, required: true },
    mediaType: { type: String, required: true },
    members: [MembersSchema],
    ownerId: { type: String, required: true }
});

module.exports = mongoose.model('League', LeagueSchema);