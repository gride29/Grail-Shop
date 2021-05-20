import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin',
		email: 'admin@example.com',
		password: bcrypt.hashSync('password'),
		isAdmin: true,
	},
	{
		name: 'Jon Arbuckle',
		email: 'john@example.com',
		password: bcrypt.hashSync('password'),
		isAdmin: true,
	},
	{
		name: 'Garfield Cat',
		email: 'garfield@example.com',
		password: bcrypt.hashSync('password'),
		isAdmin: true,
	},
];

export default users;
