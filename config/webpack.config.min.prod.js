
var path = require('path');

module.exports = {
	mode: 'production',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'craft-uikit.min.js',
		library: 'Craft',
		libraryTarget: 'window',
		globalObject: 'window'
	}
};
