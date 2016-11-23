/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[a-z]+[0-9]*          return 'IDENTIFIER'
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"+"					  return '+'
"-"					  return '-'
"*"					  return '*'
"/"					  return '/'
"="                   return '='
"^"                   return '^'
"("                   return '('
")"                   return ')'
";"                   return 'EOS'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    var Path = require('path');
    var OpNode = require(Path.resolve('./OpNode.js'));
    var NumNode = require(Path.resolve('./NumNode.js'));
    var RootNode = require(Path.resolve('./RootNode.js'));
    var Identifier = require(Path.resolve('./Identifier.js'));
    var root = new RootNode();
%}

/* operator associations and precedence */

%left '='
%left  '-' '+'
%left '*' '/'
%left '^'


%start statements

%% /* language grammar */

statements
    :   statement EOF
            {return root.setTree($$);}
    |   statement statements
    ;
statement
    :   exp EOS
    |   variable EOS
    ;
exp
    :   NUMBER
            {$$ = new NumNode(Number($1))}
    |   exp '*' exp
            {$$ = new OpNode($2, $1, $3)}
    |   variable '*' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '/' exp
            {$$ = new OpNode($2, $1, $3)}
    |   variable '/' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '+' exp
            {$$ = new OpNode($2, $1, $3)}
    |   variable '+' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '-' exp
            {$$ = new OpNode($2, $1, $3)}
    |   variable '-' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '^' exp
            {$$ = new OpNode($2, $1, $3)}
    |   variable '^' exp
            {$$ = new OpNode($2, $1, $3)}
    |   variable '=' exp
            {root.addIdentifier($1, $3)}
    ;
variable
    :   IDENTIFIER
            {$$ = new Identifier($1)}
    ;