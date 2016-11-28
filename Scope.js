var Scope = function () {
    this.context = {};
}

Scope.prototype = {
    execute: function (statements) {
        var result;
        while (statements.hashNext())
            result = statements.next().process(this.context);
        return result;
    }
}
module.exports = Scope;