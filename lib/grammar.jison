/* PlugScript grammar */

%lex
%%
\s+             /* skip whitespace */
'fun'           return 'FUNCTION';
'->'            return 'FUNCTION_ARROW';
'if'            return 'IF';
'then'          return 'THEN';
'else'          return 'ELSE';
'<='            return 'LT_EQ';
'+'             return '+';
'-'             return '-'
'('             return '(';
')'             return ')';
\d+\b           return 'NUMBER';
\w+\b           return 'IDENTIFIER';
<<EOF>>         return 'EOF';

/lex

%left IF
%left LT_EQ
%left '+' '-'
%left FUNCTION_ARROW
%left IDENTIFIER

%start expressions

%%

expressions
    : e EOF
        {return '"use strict";\n\n' + $1 + ';';}
    ;

e
    : IDENTIFIER
	    {$$ = yytext;}
    | '(' e ')'
		{$$ = '(' + $2 + ')';}
    | NUMBER
		{$$ = Number(yytext);}
    | IDENTIFIER e
		{$$ = $1 + '(' + $2 + ')';}
    | IF e THEN e ELSE e
		{$$ = "(" + $2 + ") ? (" + $4 + ") : (" + $6 + ")";}
    | e '+' e
		{$$ = $1 + ' + ' + $3;}
    | e '-' e
		{$$ = $1 + ' - ' + $3;}
    | e LT_EQ e
		{$$ = $1 + " <= " + $3;}
    | FUNCTION IDENTIFIER IDENTIFIER FUNCTION_ARROW e
		{$$ = "function " + $2 + "(" + $3 + ") {return " + $5 + ";}"}
    ;
