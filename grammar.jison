%token IDENTIFIER

/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"+"					  return '+'
"-"					  return '-'
"*"					  return '*'
"/"					  return '/'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    var Path = require('path');
    var OpNode = require(Path.resolve('./OpNode.js'));
    var NumNode = require(Path.resolve('./NumNode.js'));
%}

/* operator associations and precedence */

%left  '-' '+'
%left '*' '/'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {
            var result = $$.process();
            return result;
        }
    ;
e
    : e '+' e
        {$$ = new OpNode('+',$1,$3)}
    | e '-' e
        {$$ = new OpNode('-',$1,$3)}
    | e '*' e
        {$$ = new OpNode('*',$1,$3)}
    | e '/' e
        {$$ = new OpNode('/',$1,$3)}
    | NUMBER
        {$$ = new NumNode(Number(yytext));}
    ;

