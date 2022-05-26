const axios = require('axios');
const fs = require('fs');

let characters = ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x','y', 'z'];
let index = 1;
let total = characters.length;
let dictionary = {};

const getJson = ()=>{
axios
  .get('https://www.wordgamedictionary.com/word-lists/words-that-start-with/letter/'+characters[index]+'/words-that-start-with-'+characters[index]+'.json')
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    res.data.forEach((word) => {
        if (word.word.length > 2){
            dictionary[word.word.toUpperCase()] = 1;
        }
    });
    
    fs.writeFile('./JSONs/'+characters[index]+'.json', JSON.stringify(dictionary), 'utf8', (err) => {

        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File is written successfully!`);
        }
        index++;
        if(index <total){
            setTimeout(() =>{
                getJson();
            },2000)
        }
    })
  })
  .catch(error => {
    console.error(error);
    index++;
    if(index <total){
        setTimeout(() =>{
            //getJson();
        },2000)
    }
  });
}

getJson();
