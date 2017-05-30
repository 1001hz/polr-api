module.exports = {
    secret: 'xcxcxc',
    //database: 'mongodb://1001hz:Hendri*@ds051720.mongolab.com:51720/1001hz',
    database: 'mongodb://localhost:27017',
    port: 3001,
    host: 'http://localhost',
    protectedRoutes: [
        '/api/user',
        '/api/league',
        '/api/leagues'
    ],
    imagePath: './public/uploads/avatars/',
    imageWebPath: '/uploads/avatars/',
    tokenExpiryInMs: 3600000
}