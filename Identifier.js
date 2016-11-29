var Identifier = function(name){
	this.name = name;
}
Identifier.prototype = {
	process : function(context){
		if(context[this.name] == undefined)
		    throw '%s is not diclared.'.replace('%s', this.name);
		return context[this.name];
	}
}
module.exports = Identifier;