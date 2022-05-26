
const fs = require('fs');
//const a = require('./masterJSONs/a.json');
const characters = ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x','y', 'z'];

let dictionary = {};
let temp;
//console.log(a)
characters.forEach((char)=>{
    temp = require('./masterJSONs/'+char+'.json');
    dictionary = {...dictionary, ...temp};
})

const json = JSON.stringify(dictionary);
fs.writeFile('./masterJSONs/all_words.json',json, 'utf8', (err) => {

    if (err) {
        console.log(`Error writing file: ${err}`);
    } else {
        console.log(`File is written successfully!`);
    }
})