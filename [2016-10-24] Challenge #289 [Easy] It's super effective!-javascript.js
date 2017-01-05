// still dont understand the parsing of JSON files and how the arguments were passed in this problem. 

'use strict' // causes strict parameters 

// content creater's comment: GET request using my favorite library, VanillaJS
// httpGet Async is an arbitrary constant name with the properties 
// The following line creates a const that takes two perameters and runs the follow bock of code passing those arguments. 
//     Important to note that funcitons that are passed with the arrow function expression (=>)  do not bind 'this'. so the
//     fucntion that calls the arrow function will still be refered to when the computer reads 'this'. 
const httpGetAsync = (theUrl, callback) => {  
    var xmlHttp = new XMLHttpRequest();  // XMLHttpRequest() is an API that provides an easy way to transfer data between clinet and a server without a refresh 
    // readystate is the status of the document for example if the document is loading, interactive(pictures are loading) or completed
    // onreadystatechange is an eventhandler that activates when the status of the document has changed. 
    xmlHttp.onreadystatechange = () => {  // A built in event handler of SMLHttpRequest (XMLHttpRequest.onreadystatechange) that is called when the readyState attribute changes
        // smlhttprequest.readystate == 4 means that the request/data_transfer is complete (either successful or failed)
        //      xmlhttprequest.status checks to see what the status of the compelted request is. If it is 200 then it was successful. other values show if it was client error or server etc..
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)  
            // responseText is a DOMstring response from the http request 
            //     DOMstring is UTF-16 (unicode transformation format) which is what javascript uses for strings so it is ready to go.
            callback(xmlHttp.responseText);  // how does this assign the data from responseText into callback. Or does this mean that it calls the function that is associated with callback
                                            //      in this case it would be the fucntion response is involved in. 
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// a dictionary to make the results more concise and readable
const damageDict = { "double_damage_to": "2x", "half_damage_to": ".5x", "no_damage_to": "0x" }

const calculateDamage = () => { //constant type structure containing a function 
        // get attacker and attacked values
        // creates local variables within the block using let 
    let attacker = document.getElementById('attacker').value // gets value from a text input box 
    let attacked = document.getElementById('attacked').value
    // strings with the grave accent (``) allows strings to be multi line whereas normals trings need to have multiple single lines appended with + 
    //      These also allow code inside the ${...} brackets 
    let path = `https://pokeapi.co/api/v2/type/${attacker}`   
    let result = document.getElementById('result')  // result is a h2 element, it saves this element refrence into result
    result.innerText = "looking up result....please wait..."  // makes the result refrence text equal to that string. the .innerText method was used
    // call API
    // Not entirely sure how this part of the code calls the function. It uses the value of path when it runs the method in httpgetasync but at the same time the 
    //      resulting data that callback takes is passed onto response and then the method that response pushes to is run. So from this I assume that The initial function is run
    //      with any initial values these arugments have and their values are updated from that fucntion before any relayed fucntions are run. 
    httpGetAsync(path, (response) => {      
        let parsedResponse = JSON.parse(response)       // takes the data from the API request which returns JSON text which is stored in JSON format. Parses these into key value pairs 
        let damageRelations = parsedResponse.damage_relations //  it searches for all the values that contain the keys damage_relations

        // iterate over all the damage relations to find the name of the attacked 
        for (let prop in damageRelations) {             // this creates a variable called prop that takes each instance/property of the variable damaeRelations
            for (let type in damageRelations[prop]) {       
                if (damageRelations[prop][type].name === attacked && prop.indexOf('to') > -1) {
                    found = true
                result.innerText = `Damage Multiplier: ${damageDict[prop]}`
                }
            }
        }
        found ? null : result.innerText = "Damage Multiplier: 1x"
      })
  }

// listening for any clicks by the #submit button and cals the calculateDamage constant which is a constant equaling a function 
document.getElementById('submit').addEventListener('click', calculateDamage) 