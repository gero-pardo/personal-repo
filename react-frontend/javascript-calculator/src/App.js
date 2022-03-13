import React, {useState,} from "react";

function App() {

  const [inputValue, setInputValue] = useState("");  // current number to be input
    const [inputArray, setInputArray] = useState([]); //  saves all formulas in array
  const [formulaString, setFormulaString] = useState("0"); // displays current input in full
  const [formula, setFormula] = useState("0") // displays formulas and result
  const [outputValue, setOutputValue] = useState(""); // display end result


  const clearValues = () => {
    setInputValue("");
    setOutputValue("");
    setInputArray([]);
    setFormulaString("0");
    setFormula("0");
  }

  const addValues = (value) => { // adds a single value to inputValue TODO: best to compress the comparisons into an object

    let internalInputValue = inputValue;
    let internalInputArray = inputArray;
    let internalFormulaString = formulaString;
    let internalOutputValue = outputValue;

    // adding values is divided in pair sequences that are added to the formula array
    // always starts with a number followed by an operator, that makes a sequence
    // the formula is ended at solveValues by inputting a final number to the array

    let func = (e) => { e = e.replace(/\.(0)+$/, ""); return e;} // removes .0+ decimals
    
    // prevents multiple dots
    if (value === "." && /\./.test(internalInputValue)) { return; }
    // prevents operators after dots
    if (/[+\-*/]/.test(value) && /\.$/.test(internalInputValue)) { return; }
    // prevents dot after operator
    if (value === "." && /[+\-*/]/.test(internalFormulaString.charAt(internalFormulaString.length-1))) { return; }
    // reset order
    if (internalFormulaString === "ERROR") { return; }
    
    // if value is operator passes result of previous formula to make a new formula
    if (internalOutputValue !== "" && /[*/\-+]/.test(value)) {
      internalInputArray.push(internalOutputValue);
      internalInputArray.push(value);
      setInputValue("");
      setInputArray(internalInputArray);
      setOutputValue("");
      internalOutputValue = internalOutputValue.toString();
      return setFormulaString(internalOutputValue.concat(value));
    }

    // purges formulastring on new formula without reset
    if (internalOutputValue !== "" && /[0-9]/.test(value)) {
      setInputValue(value);
      setOutputValue("");
      return setFormulaString(value);
    }

    // is last array value operator? replace operators or adds minus sign once
    if (/[+\-*/]/.test(internalInputArray[internalInputArray.length-1]) && internalInputValue === "" && /[+\-*/]/.test(value)) { 

      if (/[+\-*/]/.test(internalInputArray[internalInputArray.length-2]) && /\d/.test(internalInputArray[internalInputArray.length-2]) === false) { // 2 n
        //if () { return null; }
        if (/-/.test(value)) { // rejects extra minus
          // console.log("double negative - invalid")
          return null;
        } else { // replaces both with new operator
          // console.log("replacing operator and negative...")
          internalInputArray.pop();
          internalInputArray.pop();
          internalInputArray.push(value);
          internalFormulaString = internalFormulaString.slice(0, -2);
          internalFormulaString = internalFormulaString.concat(value);
          setFormulaString(internalFormulaString);
          return setInputArray(internalInputArray);
        }
      }

      if (/-/.test(value)) { // concats extra minus
        // console.log("adding negative...")
        internalInputArray.push(value);
        internalFormulaString = internalFormulaString.concat(value);
        setFormulaString(internalFormulaString);
        return setInputArray(internalInputArray);
      } else { // replace op with new operator
        // console.log("replacing operator...")
        internalInputArray.pop();
        internalInputArray.push(value);
        internalFormulaString = internalFormulaString.slice(0, -1);
        internalFormulaString = internalFormulaString.concat(value);
        setFormulaString(internalFormulaString);
        return setInputArray(internalInputArray);
      }   

    }

    if (internalInputValue === "") { // first number in a sequence (always 0)
      if (/[+\-*/]/.test(value) && internalFormulaString === "0") { // for operators
        internalInputArray.push("0");
        internalInputArray.push(value);
        setInputArray(internalInputArray);
        return setFormulaString(internalFormulaString.concat(value));
      }
      if (value === ".") { // for dots
        setInputValue(internalInputValue.concat(value));
        if (internalFormulaString === "0") {
          setFormulaString(internalFormulaString.concat(value));
        } else {
          setFormulaString(internalFormulaString.concat(internalInputValue, value));
        }
      } else if (value === "0") { // for number 0
        if (internalFormulaString === "0") { return; } // no repeat 0 at first argument
        setInputValue(value);
        setFormulaString(internalFormulaString.concat(value));
      } else {  // for numbers 1 to 9
        setInputValue(value);
        if (internalFormulaString === "0") {
          setFormulaString(value);
        } else {
          setFormulaString(internalFormulaString.concat(value));
        }
      }
    }

    if (internalInputValue !== "") { // cases that start with [1-9] OR [0-9]. OR [1-9].[0.9] OR [0.9].[0.9]
      if (/[+\-*/]/.test(value)) { // for operators
        /\.(0)+$/.test(internalInputValue) && func(internalFormulaString);
        internalInputArray.push(internalInputValue);
        internalInputArray.push(value);
        setInputArray(internalInputArray);
        setInputValue("");
        setFormulaString(internalFormulaString.concat(value));
      } else { // for numbers 0 to 9
        if (value === "0" && internalInputValue === "0") { return; } // no repeat 0 at new argument
        if (/[1-9]/.test(value) && internalInputValue ==="0") { // replaces first 0 at new argument
          setInputValue(value);
          internalFormulaString = internalFormulaString.slice(0, -1);
          return setFormulaString(internalFormulaString.concat(value));
        }; // for numbers 1 to 9
        internalInputValue = internalInputValue.concat(value);
        setInputValue(internalInputValue);
        setFormulaString(internalFormulaString.concat(value));
      }
    }

    // console.log('value - input value - current input array');console.log(value);console.log(inputValue);console.log(inputArray);

  }

  const solveValues = () => {

    let internalInputArray = inputArray; // var for map
    let interimValue = 0;

    if (formulaString === "ERROR" || inputValue === "") { return; } // reset order

    if (inputValue === "" && /[+\-*/]/.test(internalInputArray[internalInputArray.length-1])) { 
      return; // prevents ending in an operator
    } else {
      setInputArray(inputArray.push(inputValue)); // loads last input number
    }


    const cleaner = (e) => {
      
      const floatMap = (x) => { // prepares numbers
        if (/[0-9]/g.test(x) === true) {
          return parseFloat(x)
        } else {
          return x
        }
      }

      const doubleOperatorsMap = (x, i, arr) => { // parses all extra negative operators to their respective number
        if (/\d/.test(x) && /-/.test(arr[i-1]) && /[+\-*/]/.test(arr[i-2])) {
          return x*-1;
        } else {
          return x;
        }
      }
  
      const doubleOperatorsFilter = (x, i, arr) => { // removes now redundant negative operators
        if (/-/.test(x) && /\d/.test(x) === false && /[+\-*/]/.test(arr[i-1])) {
          return false;
        } else {
          return true;
        }
      }

      e = e.map(floatMap);
      e = e.map(doubleOperatorsMap).filter(doubleOperatorsFilter);
  
      return e

    }
    
    const arithmeticSolve = (e) => { // breaks inputarray into * / operations

      let arr1 = []; // holds index for + - hits
      let arr2 = []; // holds index for * / hits
      let arr3 = []; // handles * / solver instances
      let j = 0; // temp value holder
      let k = 0; // for arr1 comparisons

      const operators = { // expressions for calculate
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
      }
  
      const calculate = function (val1, val2, sign) { // solves equation
        // console.log("sign in operators is:"); console.log(sign in operators);
          if (sign in operators) {
              return operators[sign](val1, val2);
          }
      }
  
      const solver = (array) => { // calls calculate for each operator
        while (array.length >= 3) {
        // console.log('input array: ');console.log(array)
        interimValue = calculate(array[0],array[2],array[1]);
        // console.log("operation result:"); console.log(interimValue);
        array.splice(0,3);
        array.unshift(interimValue);
        // console.log(array);
        };
        return array;
      }
  

      const callbackFn = (x, i) => { // value, index
        if (/[+-]/.test(x) && typeof x !== "number") {
          return arr1.push(i);
        }
      if (/[*/]/.test(x)) {
          return arr2.push(i);
        }
      }

      while (true) {

        e.forEach(callbackFn); // declares points in e where there's + - or * /

        if (arr2.length === 0 || arr1.length === 0) { 
          e = solver(e);
          break; } // there's no more * or / to process

        if (arr1[0] > arr2[0]) { // * / is first (arr2[0] will always refer to e[1], so we start in e[0])
          arr3 = e.slice(0, arr1[0]);
          e.splice(0, arr1[0]);
          arr3 = solver(arr3);
          e = arr3.concat(e);
        } else if (arr1[arr1.length-1] < arr2[0]) { // / * is at end of e
          arr3 = e.slice(arr2[0]-1, e.length);
          e.splice(arr2[0]-1, e.length-1);
          arr3 = solver(arr3);
          e = e.concat(arr3);
        } else { // * / is in the middle
            j = arr1[k]; 
          while (true) { // sorts the first + - index that with arr2[0] would repesent a * / sequence
            if (j < arr2[0]) {
              k++;
              j = arr1[k];
            } else {
              break;
            }
          }
          arr3 = e.slice(arr2[0]-1, arr1[k]);
          e.splice(arr2[0]-1, arr1[k]-arr2[0]+1);
          arr3 = solver(arr3);
          e.splice(arr2[0]-1, 0, arr3[0]);
        }

        arr1 = [];
        arr2 = [];
        j = 0;
        k = 0;

      }

      return e;
    
    }

    internalInputArray = cleaner(internalInputArray);
    internalInputArray = arithmeticSolve(internalInputArray);


    if (isNaN(interimValue)) { 
      return setFormulaString("ERROR");
    }

    setInputValue("");
    setInputArray([]);
    setOutputValue(internalInputArray[0]);
    setFormulaString(internalInputArray[0].toString());
    if (formulaString === internalInputArray[0].toString()) {
      setFormula(formulaString)
    } else {
      setFormula(formulaString.concat("="+internalInputArray[0].toString()));
    }
    
  }

  return (

    <div className="pad">

      <div className="led">
          <p id="output">{formula}</p> 
          <p id="display">{formulaString}</p>
      </div>

      <button type="button" onClick={() => clearValues()} className="startSequence" id='clear'>
        <h1>AC</h1>
      </button>
      <button type="button" onClick={() => addValues("1")} className="addSequence" id="one">
        <h1>1</h1>
      </button>
      <button type="button" onClick={() => addValues("2")} className="addSequence" id="two">
        <h1>2</h1>
      </button>
      <button type="button" onClick={() => addValues("3")} className="addSequence" id="three">
        <h1>3</h1>
      </button>
      <button type="button" onClick={() => addValues("4")} className="addSequence" id="four">
        <h1>4</h1>
      </button>
      <button type="button" onClick={() => addValues("5")} className="addSequence" id="five">
        <h1>5</h1>
      </button>
      <button type="button" onClick={() => addValues("6")} className="addSequence" id="six">
        <h1>6</h1>
      </button>
      <button type="button" onClick={() => addValues("7")} className="addSequence" id="seven">
        <h1>7</h1>
      </button>
      <button type="button" onClick={() => addValues("8")} className="addSequence" id="eight">
        <h1>8</h1>
      </button>
      <button type="button" onClick={() => addValues("9")} className="addSequence" id="nine">
        <h1>9</h1>
      </button>
      <button type="button" onClick={() => addValues("0")} className="addSequence" id="zero">
        <h1>0</h1>
      </button>
      <button type="button" onClick={() => addValues(".")} className="addSequence" id="decimal">
        <h1>.</h1>
      </button>
      <button type="button" onClick={() => addValues("+")} className="addSequence" id="add">
        <h1>+</h1>
      </button>
      <button type="button" onClick={() => addValues("-")} className="addSequence" id="subtract">
        <h1>-</h1>
      </button>
      <button type="button" onClick={() => addValues("*")} className="addSequence" id="multiply">
        <h1>X</h1>
      </button>
      <button type="button" onClick={() => addValues("/")} className="addSequence" id="divide">
        <h1>/</h1>
      </button>
      <button type="button" onClick={() => solveValues()} className="endSequence" id="equals">
        <h1>=</h1>
      </button>

    </div>
  );
};

export default App;

