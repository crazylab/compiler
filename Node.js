var Node = function(operator, left, right){
	this.operator = operator;
	this.left = left;
	this.right = right;
}

Node.prototype = {
	process : function(){
		return ['(', this.left.process(), this.operator.process(), this.right.process(), ')'].join(' ');
	}
}

module.exports = Node;