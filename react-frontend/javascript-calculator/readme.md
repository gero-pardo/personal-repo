

28/02 all FCC goals met
todo:
* proper arithmetic sorting $$$ DONE
bugs: // unchecked by FreeCodeCamp

01/03 found
* solveValues adds an extra 0 on equaling an operator as last sequence $$$ done
* addValues doesn't purge display when initiating a new equation without clearing $$$ done
* addValues derps out when initianing a new formula without clearing $$$ done
* addValues can't use 0 as second argument $$$ done

03/03 found 
* adding a . after an operator doesn't show the 0 $$$ done
* addValues doesn't allow starting a formula with 0 $$$ done
* result after dividing by 0 should be operated $$$ done
* 0 / 0 should give an exception $$$ done

12/03 found
* negative number minus 0 minus negative 0 gives nan &&& done
* should not equate a just cleared formula $$$ done
* can't add a negative number if first number is negative &&& done

12/03 bugfixed & polished

next time i'm using a parser.


notes:

post-completion thoughts:
3 functions for a hook are nowhere near enough. addValue became a barely behemoth of 6 different
methods all glued by a god-awful if chain.
these functions, by themselves, could have been divided into further hooks. fundamentally for
such a simple concept it doens't change a thing unless React changes hooks. any such decisions
are best left for project decisions.

in developing this I came across Js' quirks of operators, something FreeCodeCamp hasn't  managed to
explain. In short:
If used by themselves in a call between expressions, JavaScript returns the value of the 
expression itself.
Fundamentally it's the same concept as calling a function or variable and if they exist
they return "true" or it's apparent value. (often used in if (variable) {} shortcuts)
But here the operators add conditional logic to this statement. So the apparent value that
is returned depends on the logic used.

Examples:

exp1 &&(AND) exp2 --> returns the last true expression, exp2 if both are true
exp1 ||(OR) exp2 --> returns the first true expression, exp 1 if both are true.

8. As I input numbers, I should be able to see my input in the element with the id of "display"

bothersome problem is that all events registered inside a div such as onClick= 
are called on render. A dozen console logs registered on every update. This is due the
nature of JSX using {} references inside divs.

onClick={value} is a reference to a variable. passing a function inside it calls it every render.
onClick={() => value} is an event, and only calls upon registering to the kind of event required.

as written in the documentation:

'Notice how with onClick={() => alert('click')}, we’re passing a function as the onClick prop.
React will only call this function after a click. 
Forgetting () => and writing onClick={alert('click')} is a common mistake, 
and would fire the alert every time the component re-renders.'

9. In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, 
and when I hit "=", the correct result should be shown in the element with the id of "display"

1. split the string into an array
2. concat a formula "arr1 (expected number) + arr2 (expected operator) + arr3 (expected number)"
-- bad plan in hindsight. there's no way 'invent' a formula in Js without making whole functions.
3. get result
4. cut first 3 values of array then insert new value as first entry // do array inversed and just pop and add
-- simple splicing
5. repeat 2-3-4 until only 1 value remains and it's a number
-- while ()

I don't like this solution, lines ended up snowballing. Elegant, but dull.
Anyway it was a good reminder of the versatibility of objects.

12. I should be able to perform any operation (+, -, *, /) on numbers containing decimal points.

regexp hell.
for 1.5+1.5 parse das one string:
1. find "."
2. if "." is followed by [0-9] then operator, go method a
3. if "." is followed by [0-9] then nothing, go method b

13. If 2 or more operators are entered consecutively, the operation performed should be the last operator entered
(excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7);
if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).

This led me to reformat the addvalues function from scratch. Abandone the single line formual 
that gets parsed in regex for an approach that saves values to array as they are input.
took me roughly half the time i spent on this challenge (six-ish days). 
In hindsight, I should have redone the whole thing from scratch now that I understood how the
varues would evolve.



some analysis during solution:

// arithmeticSolve([5, "+", 5, "+", 5, "*", 5, "/", 5, "+", 5, "*", 5 ,"/", 5]);  

// 5 * 5 / 5 + 5 * 5 + 5  --- (s1) + 5 * 5 + 5 --- (s1) + (s2)25 + 5 ---- ***
// arr1 -> 5 9 -------------- 1 5 ---------------- 1 3 ------------------
// arr2 -> 1 3 7 -----done--- 3 ---done----------- [] ------done---------

// 5 + 5 * 5 / 5 + 5 / 5 ---- 5 + (s1) + 5 / 5 --- 5 + (s1) + (s2) ------
// arr1 -> 1 7 -------------- 1 3 ---------------- 1 3 ------------------
// arr2 -> 3 5 9 ------done-- 5 ------done-------- [] ------done---------


/**
 * 
 * addvalues overview:
 * 
 * in value: you add either operator, dot or number.
 * 
 * IF:
 * input is 0
 * you cant:
 * add another 0 || done
 * add an operator || done
 * you can:
 * add [1-9] || done
 * add . || done
 * 
 * IF: input is [0-9].
 * you must:
 * add another [0-9] || done
 * you cant:
 * add another . || done
 * add an operator || done
 * 
 * IF: input is [0-9].0{n}
 * you cant:
 * add another .  || done
 * you must:
 * add another [0-9] OR clear adding an operator   || done
 * 
 * IF: value is operator
 * you must:
 * push previous number to inputarray  || done
 * push operator to inputarray  || done
 * reset input to 0  || done
 *

*/