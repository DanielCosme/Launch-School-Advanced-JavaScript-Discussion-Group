Building a micro, vanilla JS library
Groups: 2-3 ppl

We are going to build a string manipulation micro library. 


1. You will need to set up a node project on one of the students machine:
- remember about the correct file structure for your files
- what files and folders should node project include?

2. You will need to create three files:
- library module: stringis.js
- file main.js that will use the functions from the module. `main.js` should simply call the functions and console log the result. If any of the functions throws an error main.js should handle that error and log to console ‘invalid input’. 
- stringis.test.js that checks if all your functions returns what they should

3. stringis.js needs to include following functions and each function has to throw an error if the input is NOT a string:


caseSwitchis
change all the upper case characters to lower case characters and lowercase characters to uppercase characters. Leave all the other characters unchanged. 
ex. Abcd_xkLL? => aBCD_Xkll?

alphaOrderis

sort all the characters in a string to be in an alphabetical order. Leaves all non alphabetical characters in the same place. Case insensitive. 

// ex. Hello, have a nice day!  => aaacd, eeeH h illn ovy!

gRamsayTranslateis
takes a string and translating it to Gordon Ramsay talk: change all characters to uppercase. End all the sentence with ‘!!!’. Add ‘YOU IDIOT SANDWICH’  after each ‘,’
ex. “This pizza is so disgusting, if you take it to Italy you’ll get arrested.”
=> “THIS PIZZA IS SO DISGUSTING, YOU IDIOT SANDWICH,  IF YOU TAKE IT TO ITALY YOU’LL GET ARRESTED!!!”

compresingis
takes a string and compress it. It changes all consecutive same characters into one and their cout
ex.  ‘Hello Woooorld’ => ‘Hel(2)o Wo(4)rld’





Bonus Features:
A bonus if you use regex at least once!

Bonus function:

firstLetterSwichis 
takes two strings and returns and array with two strings with switched first letters of each word.
Ex: firstLetterSwichis(‘I like eating icecream’, ‘What a nice day!’)
=> [‘W aike neating dcecream’, ‘Ihat l eice iay’];

vowelSwitchis
that takes in a string and replaces all the vowels [a,e,i,o,u] with their respective positions within that string.
ex. 'this is my string' => 'th3s 6s my str15ng'

removisDuplicatis
Removing all consecutive duplicate words from a string, leaving only first words entries.
Ex:  ‘"alpha beta beta gamma gamma gamma delta alpha beta beta gamma gamma gamma delta" => ‘"alpha beta gamma delta alpha beta gamma delta"



