
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
    var Node = require('./Node.js');
    var Element = require('./Element.js');
%}

/* operator associations and precedence */

%left  '-' '+'
%left '*' '/'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { console.log($$.process());}
    ;

e
    : e '+' e
        {$$ = new Node(new Element('+'),$1,$3)}
    | e '-' e
        {$$ = new Node(new Element('-'),$1,$3)}
    | e '*' e
        {$$ = new Node(new Element('*'),$1,$3)}
    | e '/' e
        {$$ = new Node(new Element('/'),$1,$3)}
    | NUMBER
        {$$ = new Element(new Number(yytext));}
    ;

