module.exports = function check(str, bracketsConfig) {
  // your solution

  let openBrackets = [];
  let closeBrackets = [];
  let bracketsStack = [];
  let bracketsException = [];
  let unclosedBracketsCounter = 0;

  // make 2 arrays to represent all types of open and close brackets
  for (i in bracketsConfig) {
    openBrackets.push(bracketsConfig[i][0]);
    closeBrackets.push(bracketsConfig[i][1]);
  }

  // array of identical opening and closing brackets
  for (k in openBrackets) {
    if (openBrackets[k] == closeBrackets[k]) {
      bracketsException.push(openBrackets[k]);
    }
  }

  let strBracketsException = bracketsException.toString();

  // traversal throug str
  for (i in str) {
    let bracketType;

    // make decision Open or Close current bracket
    // 1 - Open
    // 2 - Close
    if ((openBrackets.includes(str[i]) &&
         !strBracketsException.includes(str[i])) ||
        (strBracketsException.includes(str[i]) &&
         !bracketsStack.includes(str[i]))) {
      bracketType = 1;
    } else if (closeBrackets.includes(str[i])) {
      bracketType = 2;
    } else {
      // error: 'invalid bracket type'
      return false;
    }

    if (bracketType == 1) {
      bracketsStack.push(str[i]);
      unclosedBracketsCounter++;
    } else if (bracketType == 2) {
      if (unclosedBracketsCounter != 0) {
        let bracketIndex = closeBrackets.indexOf(str[i]);
        if (openBrackets.indexOf(bracketsStack[bracketsStack.length - 1]) ==
            bracketIndex) {
          bracketsStack.pop();
          unclosedBracketsCounter--;
        } else {
          // error: 'wrong bracket order'
          return false;
        }
      } else {
        // error: 'there are more closing brackets than opening brackets'
        return false;
      }
    }
  }

  // check our stack
  if (bracketsStack[0] == undefined) {
    return true;
  } else {
    return false;
  }
}
