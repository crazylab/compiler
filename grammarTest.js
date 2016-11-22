var assert = require('assert');
var jison = require("jison");
var fs = require("fs");

describe('addBracket', function(){

	var bnf = fs.readFileSync("./grammar.jison", "utf8");
	var parser = new jison.Parser(bnf);

	it('should be able to get expression in words with brackets', function(){
		var  input = '1 + 2 * 3'
		var expected = '( one plus ( two times three ) )'

		assert.equal(expected, parser.parse(input));
	});
});