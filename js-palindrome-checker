/*

https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker

Palindrome Checker

Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as racecar, RaceCar, and race CAR among others.

We'll also pass strings with special symbols, such as 2A3*3a2, 2A3 3a2, and 2_A3*3#A2.

*/

function palindrome(str) {
  var regex = /\W*_*/g;
  str = str.toLowerCase().replace(regex, "");
  console.log(str);
  if (str.length % 2 === 1) {
    console.log(parseInt(str.length));
    var str2 = str.slice(0, parseInt(str.length / 2));
    var str3 = str.slice(parseInt(str.length / 2) + 1);
    console.log(str2 + " and " + str3);
  } else {
    console.log(parseInt(str.length));
    var str2 = str.slice(0, parseInt(str.length / 2));
    var str3 = str.slice(parseInt(str.length / 2));
    console.log(str2 + " and " + str3);
  }

  var count1 = 0;
  var count2 = str3.length;
  var test = true

  while (count2 > 0) {
    str2.charAt(count1) === str3.charAt(count2 - 1) ? {} : test = false;
    console.log(count1 + " & " + count2 + " : " + str2.charAt(count1) + " v " + str3.charAt(count2 -1))
    console.log(test)
    count1++;
    count2--;
  }
  return test;
}



palindrome("0000_0 (: /-\ :) 0-00100");

/*

1. parse string, remove characters
2. count string length
3. if odd
  4. slice array in half from start then in half from end
5. if even 
  6. slice array in half - 1 from start then in half - 1 from end
7. loop
  8. nest inverse loop
    9. compare every instance charat loop and charat inverse loop
      10. if they are not equal, return false
10. return true

*/

