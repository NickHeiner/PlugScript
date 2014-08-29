/* PlugScript grammar */

%lex
%%
\s+             {/* skip whitespace */}
'fun'           {return 'FUNCTION';}
'->'            {return '->';}
'if'            {return 'IF';}
'then'          {return 'THEN';}
'else'          {return 'ELSE';}
'<='            {return '<=';}
'+'             {return '+';}
'-'             {return '-'}
'('             {return '(';}
')'             {return ')';}
[0-9]+\b          {return 'NUMBER';}
[a-zA-Z0-9]+\b    {return 'IDENTIFIER';}
<<EOF>>         {return 'EOF';}

/lex

%left 'IF'
%left '<='
%left '+' '-'
%left 'IDENTIFIER'

%start expressions

%%

expressions
    : e EOF
        {return $1;}
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
    | e '<=' e
		{$$ = $1 + " <= " + $3;}
    | FUNCTION IDENTIFIER IDENTIFIER '->' e
		{$$ = "function " + $2 + "(" + $3 + ") {return " + $5 + ";}"}
    ;
