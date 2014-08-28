'use strict';

var Parser = require('jison').Parser;

var grammar = {
   "comment": "PlugScript parser",

   "lex": {
      "rules": [
         ["\\s+",                    "/* skip whitespace */"],
         // ["[0-9]+\b",                "return 'NUMBER'"],
         // ["[0-9a-zA-Z]+\b",          "return 'IDENTIFIER'"],
         // ["->",                      "return 'FUNC_ARROW'"],
         // ["if",                      "return 'IF'"],
         // ["then",                    "return 'THEN'"],
         // ["else",                    "return 'ELSE'"],
         // ["<=",                      "return 'LT_EQ'"],
         ["+",                       "return '+'"],
         // ["-",                       "return '-'"],
         // ["\\(",                     "return '('"],
         // ["\\)",                     "return ')'"],
         ["$",                       "return 'EOF'"]
      ]
   },

   "operators": [
      // ["left", "+", "-"],
      // ["right", "->"]
   ],

   "bnf": {
      "expressions": [["e EOF",   "return $1"]],

      "e" :[
         ['+', '$$ = true']
         ["e + e",  "$$ = $1 + $2"],
         ["e - e",  "$$ = $1-$3"],
         ["e * e",  "$$ = $1*$3"],
         ["e / e",  "$$ = $1/$3"],
         ["e ^ e",  "$$ = Math.pow($1, $3)"],
         ["e !",    "$$ = (function(n) {if(n==0) return 1; return arguments.callee(n-1) * n})($1)"],
         ["e %",    "$$ = $1/100"],
         ["- e",    "$$ = -$2", {"prec": "UMINUS"}],
         ["( e )",  "$$ = $2"],
         ["NUMBER", "$$ = Number(yytext)"],
         ["E",      "$$ = Math.E"],
         ["PI",     "$$ = Math.PI"]
      ]
   }
};

var parser = new Parser(grammar);

console.log(parser.parse('1 + 1'));
