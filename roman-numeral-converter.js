/* 

https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter

Roman Numeral ConverterPassed

Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

*/

function convertToRoman(num) {

  const roman = [[1, "I"], [5, "V"] , [10, "X"] , [50, "L"] , [100, "C"] , [500, "D"] , [1000, "M"]];
  let str = "";
  let rem = num;
  let res = num;
  let prevRes = res; // logs
  let prevRem = rem; // logs
  // biquintinal 2/5 base system. 2 bits that composite with 5 values. 
  // true = bit A (0 to 5) / false = bit B (6 to 10) reflects half decimal numbers
  let bitABCheck = false; 

  for (let i = roman.length - 1 ; i >= 0 ; i--) {
    
    prevRes = res
    prevRem = rem;
    res = rem / roman[i][0]; // result
    rem = rem % roman[i][0]; // remmant
    var resCheck = parseInt(res)
    console.log("factor " + roman[i][0] + " orig " + num + " rem " + rem + " || res " + res + " round " + parseInt(res))
    
    if (res < 1) { 
      res = prevRes;
      rem = prevRem; 
      console.log("not valid")
      bitABCheck = true
    }
    if (resCheck === 4) {
      console.log("valid")
      console.log(str)
      if (bitABCheck === true) {
        str = str.concat(roman[i][1]).concat(roman[i+1][1]) 
      } else {
        str = str.slice(0, str.length - 1)
        str = str.concat(roman[i][1]).concat(roman[i+2][1]);
      }
      console.log(str)
    }

    if (resCheck >= 1 && resCheck <= 3) {
      console.log("valid")
      bitABCheck = false;
      while (resCheck >= 1) {
        str = str.concat(roman[i][1])
        resCheck--
        console.log(str)
      }
    }    
  }

 return str;
}

convertToRoman(3998);


/*

1. assign variable res the value of num divided by largest dividend
2. assign variable rem the value of num module by largest dividend
3. declare str string variable
4. assign variable resPrev the value of res
5. assign variable remPrev the value of rem
6. assign variable bitABCheck the value false
7. declare for loop with i variable ("i cycle")
  8. if res between 1 and 3, add/push letters equivalent to didivend to a string and change ABcheck to true
  9. if res below 1, repleace with previous res and rem and change ABcheck to false
  10. if res is 4, compare ABcheck
    11a. if ABcheck is true, add/push letters at i and at i-1
    11b. if ABcheck is false, remove last char index from string and add/push letters at i and at i-2 

*/
