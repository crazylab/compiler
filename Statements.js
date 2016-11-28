var Statements = function () {
    this.statements = [];
    this.head = 0;
}

Statements.prototype = {
    add : function (tree) {
        this.statements.push(tree);
    },

    next : function () {
        return this.statements[this.head++];
    },

    hashNext : function () {
        return this.head  < this.statements.length;
    }
}

module.exports = Statements;

