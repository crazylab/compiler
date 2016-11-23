var assert = require('assert');
var jison = require("jison");
var fs = require("fs");

describe('grammar', function(){
	var parser;
	beforeEach(function(){
		var bnf = fs.readFileSync("./grammar.jison", "utf8");
		parser = new jison.Parser(bnf);
	});

	it('@evaluate x=10;5+x*2;', function(){
		var  input = 'x=10;5+x*2;'
		var expected = 25;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=10;y=20;z=30;(x^2)+(y^2)-(z^2);', function(){
		var  input = 'x=10;y=20;z=30;x^2+y^2-z^2;'
		var expected = -400;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=12;y=10;z=x*12+y/5;z;', function(){
		var  input = 'x=12;y=10;z=x*12+y/5;z;'
		var expected = 146;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('should throw exception @evaluate x+2;x=10;', function(){
		var  input = 'x+2;x=10;'
		console.log(parser.parse(input));
		var expected = 12;
		assert.equal(expected, parser.parse(input).evaluate());
	});
});