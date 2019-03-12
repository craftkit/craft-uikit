
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'craft-uikit.min.dev.js',
		library: 'Craft',
		libraryTarget: 'window',
		globalObject: 'window'
	}
};
