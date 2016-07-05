var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Person Model
 * ==========
 */
var Person = new keystone.List('Person');

Person.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Person.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Person.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Person.defaultColumns = 'name, email, isAdmin';
Person.register();
