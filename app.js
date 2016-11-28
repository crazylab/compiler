var jison = require("jison");
var fs = require("fs");

const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

var main = function () {
    var bnf = fs.readFileSync("./grammar.jison", "utf8");
    var parser = new jison.Parser(bnf);

    rl.prompt();
    rl.on('line', function (expression) {
        try {
            console.log('\x1b[33m%s\x1b[0m ', parser.parse(expression));
        } catch (error) {
            console.log(error);
        }
        rl.prompt();
    });
}();