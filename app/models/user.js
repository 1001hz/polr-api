var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var SECRET = "xcxcxc";

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    token: { type: String },
    lastLogin: { type: String },
    fname: { type: String },
    lname: { type: String }
});

UserSchema.methods.updateFields = function (clientUser) {
    return {
        fname: clientUser.fname ? clientUser.fname : this.fname,
        lname: clientUser.lname ? clientUser.lname : this.lname
    };
};

UserSchema.methods.setToken = function () {

    //Set token
    var d = new Date();
    var now = d.getTime();
    this.token = crypto.createHash('sha256').update(this.username + SECRET + now).digest('hex');
    this.lastLogin = now;
};

UserSchema.methods.comparePassword = function (candidatePassword) {

    var candidatePasswordHash = crypto.createHash('sha256').update(candidatePassword).digest('hex');
    if (candidatePasswordHash == this.password) {
        return true;
    }
    else {
        return false;
    }

};

module.exports = mongoose.model('User', UserSchema);