const path = require('path');
const fs = require('fs');

let dataPath = path.join(__dirname, '../chirps.json')

let chirps = [
    {
        "user": "@Michael_Scott",
        "chirp": "I am Beyonce, always."
    },
    {
        "user": "@Kelly.Kapoor",
        "chirp": "I talk a lot, so I've learned to just tune myself out..."
    },
    {
        "user": "@KevinMalone",
        "chirp": "Me think, why waste time say lot word, when few word do trick?"
    },
    {
        "user": "@Michael_Scott",
        "chirp": "Fool me once, strike one.  But fool me twice...strike three."
    },
    {
        "user": "@Andy-Bernard",
        "chirp": "I'm always thinking one step ahead, like a...carpenter that makes stairs."
    }
]

fs.writeFile('chirps.json', JSON.stringify(chirps),(err) => {
    if (err) console.log(err);
})

fs.readFile(dataPath, {
    encoding: "UTF-8"
}, (err, chirps) => {

console.log(chirps)

});











