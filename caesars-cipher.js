/*

https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher

Caesars Cipher

One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.


*/


function rot13(str) {

  let charCode = 0
  let valid = false
  let temp = ""

  for (let i = 0 ; i <= str.length ; i++) { 

    temp = str[i]
    valid = /[A-Z]/.test(temp)

    if (valid) {
      charCode = str.charCodeAt(i) < 78  ? str.charCodeAt(i) + 26 - 13 : str.charCodeAt(i) - 13

      console.log(str.charCodeAt(i) + " " + str.charAt(i) + " " + charCode + " " + String.fromCharCode(charCode))
      console.log(str.slice(0, i) + " " + str.slice(i + 1))

      str = str.slice(0, i) + String.fromCharCode(charCode) + str.slice(i + 1)
      
      console.log(str)

    }

  }

  return str

}

rot13("SERR PBQR PNZC");
