const dictionary = require('./masterJSONs/all_words.json');
const levels = require('./masterJSONs/levels.json');
const fs = require('fs');

let finalArray = [];
let wombleLevels = [];
let possibleCombinations = (str, minChars=1) =>{
	let combinations = [];
	for(let i = 0 ;i < str.length; i++)
	{
		for(let j = i + minChars; j< str.length + 1; j++)
		{
            let word = str.slice(i , j);
            if(dictionary[word])
    			combinations.push(word);
		}
	}
return combinations;
}


function permute(str, l, r, minChars = 1)
{
	if (l == r){
			//console.log(possibleCombinations('cloud',3));
            finalArray= [...finalArray,...possibleCombinations(str,minChars)]
    }
    else
    {
        for (let i = l; i <= r; i++)
        {
            str = swap(str, l, i);
            permute(str, l + 1, r, minChars);
            str = swap(str, l, i);
        }
    }
}

const swap = (a, i, j)=>{
	let temp;
    let charArray = a.split("");
    temp = charArray[i] ;
    charArray[i] = charArray[j];
    charArray[j] = temp;
    return (charArray).join("");
}

const getAllPermutationsAndCombinations = (word, minChars = 1)=>{
    finalArray = [];
    word = word.toUpperCase();
    const length = word.length;
    permute(word,0, length-1,minChars);
    finalArray = [...new Set(finalArray)];
    finalArray.sort((a,b)=>a.length - b.length);
    return finalArray;
}
let index = 0;
let word;
const createLevels = (word)=>{
    const allValidWords = getAllPermutationsAndCombinations(word,3);



    fs.writeFile('./WombleJSONs/'+ word +'.json',JSON.stringify({word,allValidWords}), 'utf8', (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File is written successfully!`);
        }
        index++;
        if(index < wombleLevels.length) {
            word = wombleLevels[index];
            createLevels(word)
        }
    })
}

const createLevelList = ()=>{
    levels.forEach(element => {
        let arr = element.split('');
        arr.sort();
        element = arr.join('').toUpperCase();
        wombleLevels.push(element);
    });

    wombleLevels = [...new Set(wombleLevels)];

    wombleLevels.sort((a,b)=>a.length - b.length);
    let json = JSON.stringify(wombleLevels);
    fs.writeFile('./WombleJSONs/levels.json',json, 'utf8', (err) => {

        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File is written successfully!`);
        }
        index = 0;
        word = wombleLevels[index];
        createLevels(word)

    })
}

createLevelList();

//console.log(getAllPermutationsAndCombinations("quietly",3));