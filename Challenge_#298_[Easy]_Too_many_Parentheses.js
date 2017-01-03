// Code taken from link below and all the comments are made by me. 
// https://www.reddit.com/r/dailyprogrammer/comments/5llkbj/2017012_challenge_298_easy_too_many_parentheses/dbx7ayg/

function removeParens(string) {  // passes one argument which is labeled string, no need to include the var syntax or type of varible.
    const open = []; // creates a constant array so it can't be assigned an array but elements can be pushed into it
    const prevMatch = { // creates a constant 'object'. The object is a constant however the keys within the object are mutable
        open: '', // this is a key open with a value '', this is free to be changed. 
        close: ''
    };
    const updatedString = string.split(''); // makes a copy of the string split into characters
    let openBracket;    // let creates a local variable just within the block it's in as well as its subgroups

    for (let i = 0; i < string.length; i++) { // i runs the length of string 
        const char = string.charAt(i);  // makes a constant char that equals the character of position i of the string
        if (char === '(') {
            open.push(i); // adds the location of ( into open 
        } else if (char === ')') {
            openBracket = open.pop(); // makes openBracket equal to the location of the most recent (
            if (openBracket === prevMatch.open - 1 && prevMatch.close === i - 1) {  // checks to see if the position before the last matched ( is also a (. If that is the case, then it checks to see if the location before the current one is a ). If that is the case then it means it is a redundent set of brackets. 
                updatedString[openBracket] = ''; // removes the previous openbracket 
                updatedString[i] = '';   // removes the current close bracket 
            } else if (openBracket + 1 === i) { // checkes to see if the previous open bracket was directly before 
                updatedString[openBracket] = '';  // removes the current bracket from the split string 
                updatedString[i] = ''; // removes the following bracket from the split string 
            }
            prevMatch.open = openBracket; // records the location of the matched open bracket 
            prevMatch.close = i; // records the location of the closed bracket. 
        }
    }
    return updatedString.filter(Boolean).join(''); // filter(Boolean) removes all false, null undefined 0 and NaN values. And join will append the split characters together to form a string. 
}