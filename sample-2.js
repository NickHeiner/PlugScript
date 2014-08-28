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
      ["left", "+", '-'],
      // ["left", "+", "-"],
      // ["left", "*", "/"],
      // ["left", "^"],
      // ["right", "!"],
      // ["right", "%"],
      // ["left", "UMINUS"]
   ],

   "bnf": {
      "expressions": [["e EOF",   "return $1"]],

      "e" :[
         // ["e + e",  "$$ = $1 + ' + ' + $3"],
         // ["e - e",  "$$ = $1 + ' - ' + $3"],
         // ["e - e",  "$$ = $1-$3"],
         // ["e * e",  "$$ = $1*$3"],
         // ["e / e",  "$$ = $1/$3"],
         // ["e ^ e",  "$$ = Math.pow($1, $3)"],
         // ["e !",    "$$ = (function(n) {if(n==0) return 1; return arguments.callee(n-1) * n})($1)"],
         // ["e %",    "$$ = $1/100"],
         // ["- e",    "$$ = -$2", {"prec": "UMINUS"}],
         ['IDENTIFIER', '$$ = yytext'],
         ["( e )",  "$$ = '(' + $2 + ')'"],
         ['FUNCTION IDENTIFIER -> e', '$$ = "function " + $2 + "() { return " + $4 + ";}"'],
         ["NUMBER", "$$ = Number(yytext)"],
         ["IDENTIFIER e", "$$ = $1 + '(' + $2 + ')'"],
         ['IF e THEN e ELSE e', '$$ = "(" + $2 + ") ? (" + $4 + ") : (" + $6 + ")"']
         // ["E",      "$$ = Math.E"],
         // ["PI",     "$$ = Math.PI"]
      ]
   }
};

var parser = new Parser(grammar);

console.log(parser.parse("fib n"));
console.log(parser.parse("fun foo -> foo 3"));
console.log(parser.parse("if 3 then 2 else 1"));
console.log(parser.parse("fun bar -> if 3 then 2 else 1"));
