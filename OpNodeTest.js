var assert = require('assert');
var OpNode = require('./OpNode.js');
var NumNode = require('./NumNode.js');

describe('OpNode', function(){
	it('should be able to process parse tree and return expression with words', function(){
		var parseTree = new OpNode('+', new OpNode('-', new NumNode(50), new NumNode(40)), new NumNode(10));
		var expected = '( ( fifty minus forty ) plus ten )'

		assert.equal(expected, parseTree.process());
	});

	it('should fail with wrong expectation', function(){
		var parseTree = new OpNode('+', new OpNode('-', new NumNode(50), new NumNode(40)), new NumNode(10));

		assert.notEqual('not expected', parseTree.process());
	})
});

describe('NumNode', function(){
	it('should be able to get numbers in words', function(){
		assert('fifty', new NumNode(50).process());
	})
});
