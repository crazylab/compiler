var Identifier = function(name){
	this.name = name;
}
Identifier.prototype = {
	process : function(context){
		if(context[this.name] == undefined)
		    throw ['The variable',this.name,'is not diclared.'].join(' ');
		return context[this.name];
	}
}
module.exports = Identifier;