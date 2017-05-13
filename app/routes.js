var api = require('./controllers/api');
var user = require('./controllers/user');
var auth = require('./controllers/auth');

module.exports = function(router){

    router
        .route('/')
        .get(api.getMessage);

    router
        .route('/error')
        .get(api.getError);

    router
        .route('/api')
        .get(api.getMessage);

    /**
     * Auth Section
     */
    router
        .route('/api/login')
        .post(auth.login);

    router
        .route('/api/user/logout')
        .get(auth.logout);

    /**
     * User Section
     */

    router
        .route('/api/user/:id')
        .get(user.findById);

    router
        .route('/api/open/user')
        .post(user.create);

    router
        .route('/api/user')
        .post(user.update);

    router
        .route('/api/user/password')
        .post(user.updatePassword);

    /**
     * League Section
     */

    router
        .route('/api/league/:id')
        .get(user.findById);
}