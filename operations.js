var binaryOperations = {
    '+': function (left, right) {
        return left + right;
    },
    '-': function (left, right) {
        return left - right;
    },
    '*': function (left, right) {
        return left * right;
    },
    '/': function (left, right) {
        return left / right;
    },
    '^': function (left, right) {
        return Math.pow(left, right);
    }
};
var unaryOperations = {
    '!': function (value) {
        var result = 1;
        for (var counter = 2; counter <= value; counter++) {
            result *= counter;
        }
        return result;
    }
}

var operations = {
    binary : binaryOperations,
    unary : unaryOperations
}
module.exports = operations;