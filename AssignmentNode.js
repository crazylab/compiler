var Identifier = require('./Identifier.js');

var AssignmentNode = function (identifier, expression) {
    if (!(identifier instanceof Identifier))
        throw "Invalid left-hand side in assignment";

    this.variable = identifier.name;
    this.expression = expression;
}

AssignmentNode.prototype = {
    process: function (context) {
        var evaluatedResult = this.expression.process(context);
        context[this.variable] = evaluatedResult;
        return evaluatedResult;
    }
}

module.exports = AssignmentNode;
