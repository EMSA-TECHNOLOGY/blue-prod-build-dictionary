/**
 * Module dependencies
 */

var assert = require('assert');
var path = require('path');
var loader = require('../');



describe('basic usage', function(){

  it('should have loaded some controllers as expected', function (done){

    loader.optional({
      dirname: path.resolve(__dirname, './fixtures/brushfire-chp10-end/api/controllers'),
      filter: /(.+)Controller\.js$/
    }, function (err, controllers){
      if (err) { return done(err); }

      try {
        assert.deepEqual(controllers,
          { page:
           { showSignupPage: require('./fixtures/brushfire-chp10-end/api/controllers/PageController').showSignupPage,
             showRestorePage: require('./fixtures/brushfire-chp10-end/api/controllers/PageController').showRestorePage,
             showEditProfilePage: require('./fixtures/brushfire-chp10-end/api/controllers/PageController').showEditProfilePage,
             showProfilePage: require('./fixtures/brushfire-chp10-end/api/controllers/PageController').showProfilePage,
             showAdminPage: require('./fixtures/brushfire-chp10-end/api/controllers/PageController').showAdminPage,
             showHomePage: require('./fixtures/brushfire-chp10-end/api/controllers/PageController').showHomePage,
             showVideosPage: require('./fixtures/brushfire-chp10-end/api/controllers/PageController').showVideosPage,
             identity: 'page',
             globalId: 'Page' },
          user:
           { login: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').login,
             logout: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').logout,
             signup: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').signup,
             removeProfile: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').removeProfile,
             restoreProfile: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').restoreProfile,
             restoreGravatarURL: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').restoreGravatarURL,
             updateProfile: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').updateProfile,
             changePassword: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').changePassword,
             adminUsers: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').adminUsers,
             updateAdmin: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').updateAdmin,
             updateBanned: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').updateBanned,
             updateDeleted: require('./fixtures/brushfire-chp10-end/api/controllers/UserController').updateDeleted,
             identity: 'user',
             globalId: 'User' },
          video: { identity: 'video', globalId: 'Video' }
        });
      } catch (e) { return done(e); }

      return done();
    });

  });//</it should have loaded some controllers as expected>


  it('should have aggregated some config as expected', function (done){

    loader.aggregate({
      dirname: path.resolve(__dirname, './fixtures/brushfire-chp10-end/config'),
      filter: /(.+)\.js$/
    }, function (err, config){
      if (err) { return done(err); }

      try {
        assert.deepEqual(config, { blueprints: { actions: false, rest: false, shortcuts: false },
          bootstrap: require('./fixtures/brushfire-chp10-end/config/bootstrap').bootstrap,
          connections:
           { localDiskDb: { adapter: 'sails-disk' },
             someMysqlServer:
              { adapter: 'sails-mysql',
                host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
                user: 'YOUR_MYSQL_USER',
                password: 'YOUR_MYSQL_PASSWORD',
                database: 'YOUR_MYSQL_DB' },
             someMongodbServer: { adapter: 'sails-mongo', host: 'localhost', port: 27017 },
             somePostgresqlServer:
              { adapter: 'sails-postgresql',
                host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
                user: 'YOUR_POSTGRES_USER',
                password: 'YOUR_POSTGRES_PASSWORD',
                database: 'YOUR_POSTGRES_DB' },
             myPostgresqlServer:
              { adapter: 'sails-postgresql',
                host: 'localhost',
                user: 'jgalt',
                password: 'blahblah',
                database: 'brushfire' } },
          cors: {},
          development: {},
          production: {},
          globals: {},
          http: {},
          i18n: {},
          log: {},
          models: { connection: 'localDiskDb', schema: true, migrate: 'drop' },
          policies:
           { '*': true,
             VideoController: { create: [ 'isLoggedIn' ] },
             UserController:
              { login: [ 'isLoggedOut' ],
                logout: [ 'isLoggedIn' ],
                removeProfile: [ 'isLoggedIn' ],
                updateProfile: [ 'isLoggedIn' ],
                restoreGravatarURL: [ 'isLoggedIn' ],
                changePassword: [ 'isLoggedIn' ],
                signup: [ 'isLoggedOut' ],
                restoreProfile: [ 'isLoggedOut' ],
                adminUsers: [ 'isLoggedIn', 'isAdmin' ],
                updateAdmin: [ 'isLoggedIn', 'isAdmin' ],
                updateBanned: [ 'isLoggedIn', 'isAdmin' ],
                updateDeleted: [ 'isLoggedIn', 'isAdmin' ] },
             PageController:
              { showSignupPage: [ 'isLoggedOut' ],
                showAdminPage: [ 'isLoggedIn', 'isAdmin' ],
                showProfilePage: [ 'isLoggedIn' ],
                showEditProfilePage: [ 'isLoggedIn' ],
                showRestorePage: [ 'isLoggedOut' ] } },
          routes:
           { 'PUT /login': 'UserController.login',
             'GET /logout': 'UserController.logout',
             'GET /video': 'VideoController.find',
             'POST /video': 'VideoController.create',
             'POST /user/signup': 'UserController.signup',
             'PUT /user/removeProfile': 'UserController.removeProfile',
             'PUT /user/restoreProfile': 'UserController.restoreProfile',
             'PUT /user/restoreGravatarURL': 'UserController.restoreGravatarURL',
             'PUT /user/updateProfile': 'UserController.updateProfile',
             'PUT /user/changePassword': 'UserController.changePassword',
             'GET /user/adminUsers': 'UserController.adminUsers',
             'PUT /user/updateAdmin/:id': 'UserController.updateAdmin',
             'PUT /user/updateBanned/:id': 'UserController.updateBanned',
             'PUT /user/updateDeleted/:id': 'UserController.updateDeleted',
             'GET /': 'PageController.showHomePage',
             'GET /videos': 'PageController.showVideosPage',
             'GET /administration': 'PageController.showAdminPage',
             'GET /profile': 'PageController.showProfilePage',
             'GET /edit-profile': 'PageController.showEditProfilePage',
             'GET /restore': 'PageController.showRestorePage',
             'GET /signup': 'PageController.showSignupPage' },
          session: { secret: 'blahblah' },
          sockets: {},
          views: { engine: 'ejs', layout: 'layout', partials: true } });
      } catch (e) { return done(e); }

      return done();
    });

  });//</it should have aggregated some config as expected>


});//</describe>

