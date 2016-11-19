var Node = require('./Node.js');
var converter = require('number-to-words');

var Element = function(value){
	this.value = value;
}

var operatorNameMap = {
	'+' : 'plus',
	'-' : 'minus',
	'*' : 'times',
	'/' : 'divided by'
}

Element.prototype = {
	isOpperator : function(){
		var operators = Object.keys(operatorNameMap);
		return operators.indexOf(this.value) >= 0;		
	},

	process : function(){
		if(this.value instanceof Node)		return this.value.process();
		if(this.isOpperator())				return operatorNameMap[this.value];
		if(this.value instanceof Number)	return converter.toWords(this.value);
	}
}

module.exports = Element;