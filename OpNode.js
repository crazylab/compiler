var OpNode = function(operator, left, right){
	this.operator = operator;
	this.left = left;
	this.right = right;
}

OpNode.prototype = {
	process : function(){
		var opToWord = {
			'-' : 'minus',
			'+' : 'plus',
			'/' : 'divided by',
			'*' : 'times'
		}

		var resultString = ['(', this.left.process(), opToWord[this.operator], this.right.process(), ')'].join(' ');
		return resultString;
	}
}

module.exports = OpNode;