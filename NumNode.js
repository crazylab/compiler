var converter = require('number-to-words');

var NumNode = function(value){
	this.value = value;
}

NumNode.prototype = {
	process : function(){
		return converter.toWords(this.value);
	}
}

module.exports = NumNode;