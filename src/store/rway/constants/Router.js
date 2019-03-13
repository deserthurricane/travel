export const RULES = {
	start	: '/',
	trains	: '/trains',
	coupes	: '/coupes',
	pass	: '/pass',
	book	: '/book/:id([0-9]{1,9})/:hash([0-9a-zA-Z]{30,35})',
	status	: '/status/:id([0-9]{1,9})/:hash([0-9a-zA-Z]{30,35})'
};

export const ROUTING = 'ROUTING';
