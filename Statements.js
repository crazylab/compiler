var Statements = function () {
    this.statements = [];
}

Statements.prototype = {
    add : function (tree) {
        this.statements.push(tree);
    },

    next : function () {
        return this.statements.shift();
    },

    hashNext : function () {
        return this.statements.length != 0;
    }
}

module.exports = Statements;

