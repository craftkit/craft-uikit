
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'craft-uikit.umd.dev.js',
		library: 'Craft',
		libraryTarget: 'umd'
	}
};
