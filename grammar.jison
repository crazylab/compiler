/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"sin"                 return 'sin'
"cos"                 return 'cos'
[a-z]+[0-9]*          return 'IDENTIFIER'
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"+"					          return '+'
"-"					          return '-'
"*"					          return '*'
"/"					          return '/'
"^"                   return '^'
"!"                   return '!'
"="                   return '='
"("                   return '('
")"                   return ')'
";"                   return 'EOS'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    var Path = require('path');
    var OpNode = require(Path.resolve('./OpNode.js'));
    var UnaryOpNode = require(Path.resolve('./UnaryOpNode.js'));
    var NumNode = require(Path.resolve('./NumNode.js'));
    var Identifier = require(Path.resolve('./Identifier.js'));
    var AssignmentNode = require(Path.resolve('./AssignmentNode.js'));
    var Statements = require(Path.resolve('./Statements.js'));

    var statements = new Statements();
%}

/* operator associations and precedence */

%left '='
%left '-' '+'
%left '*' '/'
%left '^'
%right 'sin' 'cos'
%left '!'

%start statements

%% /* language grammar */

statements
    :   statement EOF
            {return statements;}
    |   statement statements
    ;
statement
    :   exp EOS
          {statements.add($$);}
    ;
exp
    :   NUMBER
            {$$ = new NumNode(Number($1))}
    |   IDENTIFIER
            {$$ = new Identifier($1)}
    |   '(' exp ')'
            {$$ = $2}
    |   exp '=' exp
            {$$ = new AssignmentNode($1, $3)}
    |   exp '*' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '/' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '+' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '-' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '^' exp
            {$$ = new OpNode($2, $1, $3)}
    |   exp '!'
            {$$ = new UnaryOpNode($2, $1)}
    |  'sin' exp
            {$$ = new UnaryOpNode($1, $2)}
    |  'cos' exp
            {$$ = new UnaryOpNode($1, $2)}
    ;