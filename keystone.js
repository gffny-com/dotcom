// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

keystone.init({
	'name': 'gffny.com',
	'brand': 'gffny.com',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,
    'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://keystone:keystone@ds011725.mlab.com:11725/gffnydotcom',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Person',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));
keystone.Email.defaults.templateExt = 'hbs';
keystone.Email.defaults.templateEngine = require('handlebars');

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	people: 'people',
});

keystone.start();
