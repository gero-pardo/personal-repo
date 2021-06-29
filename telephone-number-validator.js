/*

https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator

Telephone Number Validator

Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555

For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.


*/


function telephoneCheck(str) {

  const numberRegex = /[0-9]*/g // to count all digits
  const invalidCharCheck = /[^0-9 \(\)-]/
  let digitCount = str.match(numberRegex).join("")
  console.log(digitCount + " " + digitCount.length);
  
  if (digitCount.length < 10 || digitCount.length > 11) {
    return false
  }
  if (digitCount.length === 11 && str[0] != 1) {
    return false
  }
  if (invalidCharCheck.test(str)) {
    return false
  }

  // Proper hyphenation regex (deprecated)
  // const formatRegex = /-(?=[0-9]{4})| (?=[0-9]{4})|[0-9]{3}(?=-[0-9]{4})/;
  // isItValid = formatRegex.test(str)
  // Only for first "area code" grouping, all possible forms. Parentheses only valid is closed on area code - " ?\([0-9]{3}\)" is for independent parenthesis - " [0-9]{3}[ \-]" is for 11 char strings - "^1[0-9]{3}(?!\))-?" is for digit only strings
  const areaCodeRegex = / [0-9]{3}[ \-]| ?\([0-9]{3}\)|^1?[0-9]{3}(?!\))-?/; 
  let isItValid = true;
  isItValid = areaCodeRegex.test(str);

  return isItValid;
}

telephoneCheck("(6054756961)");

/*

  var test2 = str.match(areaCodeRegex);
  console.log(test2);
  console.log(test2 + " " + test2.length);

Parameters: Content (numbers) must be valid and Format must be valid
Dependant factors in number types: None. 
Dependant factors is string types: Function success depends may be technically true but depends on format validity.

Order of validation: Numbers -> String -> Return True

Part 1: Number validation:

1. Declare variable numberRegex, assign regex that parses and captures for 2 blocks of 3 digits and 1 block of 4 digits or 1 block of 10 digis, and checks for the presence of 1 digit at the start of string
2. Declare variable digitCount, assign result of str RegExp match for regex // assign capture groups from another array
  3. Join variable digitCount, empty joiners
4. If digitCount is greater than 11 or lower than 10, return false
5. If digitCount is 11 and first char of digitCount is not 1, return false

Part 2: String validation

1. Declare isItValid variable, assign boolean true
2. Declare variable formatRegex, assign regex that parses and checks for - between digit blocks or \b between digit blocks
  3a. all captured blocks must be separated by - if one is present, unless () is present, 
  3b. all captured blocks must be separated by \b if one is present, unless () is present, 
4. Assign isItValid result of formatRegex RegExp test against str
5. Declare variable parenthesisCheck, assign regex that checks for pressence of parenthesis on the "area code" number, first capture block
6. Assign isItValid result of parenthesisCHeck RegExp test against str
7. if isItValid is true, return true

missed step: finding and removing invalid chars
*/
