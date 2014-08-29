'use strict';

var Parser = require("jison").Parser;

var grammar = {
   "comment": "JSON Math Parser",
   // JavaScript comments also work

   "lex": {
      "rules": [
         ["\\s+",                    "/* skip whitespace */"],
         ["fun",                     "return 'FUNCTION'"],
         ['->',                      'return "->"'],
         ['if',                      'return "IF"'],
         ['then',                    'return "THEN"'],
         ['else',                    'return "ELSE"'],
         ["<=",                      "return '<='"],
         ["\\+",                     "return '+'"],
         ["\\-",                     "return '-'"],
         ["\\(",                     "return '('"],
         ["\\)",                     "return ')'"],
         ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER'"],
         ["[a-zA-Z0-9]+\\b",         "return 'IDENTIFIER'"],
         ["$",                       "return 'EOF'"]
      ]
   },

   "operators": [
      ["left", "IF"],
      ["left", "<="],
      ["left", "+", '-'],
      ["left", "IDENTIFIER"],
   ],

   "bnf": {
      "expressions": [["e EOF",   "return $1"]],

      "e" :[
         ['IDENTIFIER', '$$ = yytext'],
         ["( e )",  "$$ = '(' + $2 + ')'"],
         ["NUMBER", "$$ = Number(yytext)"],
         ["IDENTIFIER e", "$$ = $1 + '(' + $2 + ')'"],
         ['IF e THEN e ELSE e', '$$ = "(" + $2 + ") ? (" + $4 + ") : (" + $6 + ")"'],
         ["e + e",  "$$ = $1 + ' + ' + $3"],
         ["e - e",  "$$ = $1 + ' - ' + $3"],
         ['e <= e', '$$ = $1 + " <= " + $3'],
         ['FUNCTION IDENTIFIER IDENTIFIER -> e', '$$ = "function " + $2 + "(" + $3 + ") {return " + $5 + ";}"']
      ]
   }
};

var parser = new Parser(grammar);

console.log(parser.parse("fib n"));
console.log(parser.parse("fun foo n -> n"));
console.log(parser.parse("if 3 then 2 else 1"));
console.log(parser.parse("fun bar y -> if y then 2 + y else 1"));
console.log(parser.parse("fun fib n -> if n <= 1 then 1 else fib (n - 1) + fib (n - 2)"));
