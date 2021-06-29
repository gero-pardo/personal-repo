/*

https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register

Cash Register

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

*/

function checkCashRegister(price, cash, cid) {
  
  const cidValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  var floatToIntBy100 = function(float, decimalLimit) {
    // multiplies floating point args by 100 via toString. 
    // remember arithmetic equivalence: if one variable is multiplied
    // all others must be or results with be wrong

    //integer
    if (Number.isInteger(float)) {
      return float * 100
    }
    float = float.toString()
    if (/\.[0-9]{2}[0-9]+/.test(float) && decimalLimit == true) {
      return console.log("FAILURE: 2 Decimals Only.")
    }

    //floating
    let floatIndex = /\./.exec(float).index // string index, remember off-by-one
    let digitCounter = float.substr(floatIndex+1)
    let wholeDecimals = float.slice(floatIndex+3)
    let firstTwoDecimals = float.slice(floatIndex+1, floatIndex+3)
    if (/\.[0-9]$/.test(float)) {
      float = float.slice(0, floatIndex) + digitCounter + 0
    } 
    if (/\.[0-9]{2}$/.test(float)) {
      float = float.slice(0, floatIndex) + digitCounter
    }
    if (/\.[0-9]{2}[0-9]+$/.test(float)) {
      float = float.slice(0, floatIndex) + firstTwoDecimals + "." + wholeDecimals
    }

    float = parseFloat(float);
    return float
  }

  var intToFloatBy100 = function(int) {
    // divides floating point args by 100 via toString. 
    // remember arithmetic equivalence: if one variable is divided
    // all others must be or results with be wrong
    var checkInt = Number.isInteger(int)
    int = int.toString()

    // integer
    if (int.length == 1 && checkInt == true) {
      int = "0.0" + int
      int = parseFloat(int);
      return int
    }
    if (checkInt == true) {
      int = int.slice(0, int.length-2) + "." + int.slice(int.length-2)
      int = parseFloat(int);
      return int
    }

    // floating
    let intIndex = /\./.exec(int).index // string index, remember off-by-one
    let digitCounter = int.substr(intIndex+1)
    let wholeDigits = int.slice(0, intIndex-2)
    let lastTwoDigits = int.slice(intIndex-2, intIndex)

    if (/^[0-9]\./.test(int)) {
      int = "0.0" + int.slice(0, intIndex) + digitCounter
    }
    if (/^[0-9]{2}\./.test(int)) {
      int = "0." + int.slice(0, intIndex) + digitCounter
    } 
    if (/^[0-9]+[0-9]{2}\./.test(int)) {
      int = wholeDigits + "." + lastTwoDigits + digitCounter  
    }
    int = parseFloat(int);
    return int
  }

  // total sum
  let cidSum = 0;
  cid.forEach((x) => {
    cidSum = floatToIntBy100(cidSum);
    x[1] = floatToIntBy100(x[1]);
    cidSum = cidSum + x[1];  
    cidSum = intToFloatBy100(cidSum);
    x[1] = intToFloatBy100(x[1]);
    //console.log(cidSum)
  });

  let changeToGive = 0;
  cash = floatToIntBy100(cash);
  price = floatToIntBy100(price);
  changeToGive = intToFloatBy100(cash - price);
  console.log(changeToGive);

  if (changeToGive > cidSum) { return { status: "INSUFFICIENT_FUNDS", change: [] } };
  if (changeToGive == cidSum) { return { status: "CLOSED", change: cid } };

  // Largest to smallest unit by unit substraction
  cid = cid.sort((a, b) => b - a);
  let cidTake = []; // amounts substracted from machine
  let currentUnitCounter = 0;
  let i = cidValues.length-1; //  for floating point cid operations
  let arithmethicCheck = false; // for floating point cid operations

  cid.forEach((x) => { 
    console.log(changeToGive + " / " + x[0] + " (" + x[1] + "): " + changeToGive / cidValues[i])
    currentUnitCounter = 0;
    arithmethicCheck = false;
    // is it larger than 1 unit of this currency?
    if ( (changeToGive / cidValues[i] ) >= 1 && x[1] != 0) {
    
      while (changeToGive >= cidValues[i]) { 

        changeToGive = floatToIntBy100(changeToGive)
        cidValues[i] = floatToIntBy100(cidValues[i])
        if (arithmethicCheck == false) {
          x[1] = floatToIntBy100(x[1])
          arithmethicCheck = true
        }
        changeToGive = changeToGive - cidValues[i];
        currentUnitCounter = currentUnitCounter + cidValues[i];
        changeToGive = intToFloatBy100(changeToGive)
        cidValues[i] = intToFloatBy100(cidValues[i])

        // Max units reached, or no longer possible to substract with unit
        if (currentUnitCounter >= x[1] || changeToGive == 0 || changeToGive < cidValues[i] ) {
          currentUnitCounter = intToFloatBy100(currentUnitCounter) 
          x[1] = intToFloatBy100(x[1]);
          console.log(currentUnitCounter + " " + x[0] +" maxxed out - remaining: " + changeToGive)
          cidTake.push([x[0], currentUnitCounter])
          console.log(cidTake)
          break
        }
      }
    }
    i--
  });

  if (changeToGive == 0) {
    return {status: "OPEN", change: cidTake}
  } else {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
}

var lel = checkCashRegister(1.01, 2.1, [["PENNY", 1.15], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) ;
console.log(lel);

/*

Very, very important note:

Never, ever, operate floating points.

Parameters not checked by FreeCodeCamp:

checkCashRegister(1, 2, [["PENNY", 1.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
checkCashRegister(1.01, 2.5, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
checkCashRegister(1, 2.5, [["PENNY", ], ["NICKEL", 2], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

  Conditions for multiply/divide nested funtions:

  x > 1 (15), x = 1 (1) or x < 1 (0.5)
  isInteger true (15.5) or false (15)
  0.5
  1
  1.5
  2

  0.5
  1
  1.5
  10.5
  100.5
  100n.5
  2

*/
