var assert = require('assert');
var RootNode = require('../Scope.js');
var OpNode = require('../OpNode.js');
var NumNode = require('../NumNode.js');
var AssignmentNode = require('../AssignmentNode.js');
var Identifier = require('../Identifier.js');
var Statements = require('../Statements.js');


describe('Scope', function () {
    var statements, scope;

    beforeEach(function () {
        statements = new Statements();
        scope = new RootNode();
    });

    it('should be able to evaluate the statements @2+3 and returns result', function () {
        var twoPlus3 = new OpNode('+', new NumNode(2), new NumNode(3));
        statements.add(twoPlus3);

        assert.equal(5, scope.execute(statements));
    });

    it('should be able to evaluate the statements @(2*3)+3 and returns result', function () {
        var twoInto3Plus3 = new OpNode('+', new OpNode('*', new NumNode(2), new NumNode(3)), new NumNode(3));
        statements.add(twoInto3Plus3);

        assert.equal(9, scope.execute(statements));
    });

    it('should be able to evaluate the statements @x=2; and return 2', function () {
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));
        statements.add(xEquals2);

        assert.equal(2, scope.execute(statements));
    });

    it('should be able to evaluate the statements @x=2;x; and returns result', function () {
        var x = new Identifier('x');
        var xEquals2 = new AssignmentNode(x, new NumNode(2));

        statements.add(xEquals2);
        statements.add(x);

        assert.equal(2, scope.execute(statements));
    });

    it('should be able to evaluate the statements @x=2;x+4; and returns the result', function () {
        var x = new Identifier('x');
        var xEquals2 = new AssignmentNode(x, new NumNode(2));
        var xPlus4 = new OpNode('+', x, new NumNode(4));

        statements.add(xEquals2);
        statements.add(xPlus4);

        assert.equal(6, scope.execute(statements));
    });

    it('should be able to evaluate the statements @x=2;y=x+4;y-4; and returns the result', function () {
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));
        var yEqualsXPlus4 = new AssignmentNode(new Identifier('y'), new OpNode('+', new Identifier('x'), new NumNode(4)));
        var yMinus4 = new OpNode('-', new Identifier('y'), new NumNode(4));

        statements.add(xEquals2);
        statements.add(yEqualsXPlus4);
        statements.add(yMinus4);

        assert.equal(2, scope.execute(statements));
    });

    it('should be able to evaluate the statements @x=10;y=20;z=30;(x^2)+(y^2)-(z^2); and returns the result', function () {
        var xEquals10 = new AssignmentNode(new Identifier('x'), new NumNode(10));
        var yEquals20 = new AssignmentNode(new Identifier('y'), new NumNode(20));
        var zEquals30 = new AssignmentNode(new Identifier('z'), new NumNode(30));

        var powerOf2 = function (identifier) {
            return new OpNode('^', new Identifier(identifier), new NumNode(2));
        }
        var expression = new OpNode('-', new OpNode('+', powerOf2('x'), powerOf2('y')), powerOf2('z')); //(x^2)+(y^2)-(z^2);

        statements.add(xEquals10);
        statements.add(yEquals20);
        statements.add(zEquals30);
        statements.add(expression);

        assert.equal(-400, scope.execute(statements));
    });

    it('should throw exception when variable is diclared later @2*x;x=3;', function () {
        var xTimes2 = new OpNode('*', new NumNode(2), new Identifier('x'));
        var xEquals3 = new AssignmentNode(new Identifier('x'), new NumNode(3));

        statements.add(xTimes2);
        statements.add(xEquals3);

        try {
            scope.execute(statements);
        } catch (err) {
            assert.equal("x is not diclared.", err)
        }
    });

    it('should be able to evaluate the statements @x=2;x=2^5;x; and returns the result', function () {
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));
        var xPower5 = new AssignmentNode(new Identifier('x'), new OpNode('^', new Identifier('x'), new NumNode(5)));
        var x = new Identifier('x');

        statements.add(xEquals2);
        statements.add(xPower5);
        statements.add(x);

        assert.equal(32, scope.execute(statements));
    });

    it('should be able to evaluate the statements @x=2;x=2^5;x; and returns the result', function () {
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));
        var xPower5 = new AssignmentNode(new Identifier('x'), new OpNode('^', new Identifier('x'), new NumNode(5)));
        var x = new Identifier('x');

        statements.add(xEquals2);
        statements.add(xPower5);
        statements.add(x);

        assert.equal(32, scope.execute(statements));
    });
});