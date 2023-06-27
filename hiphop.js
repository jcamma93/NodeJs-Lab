// Declaring these variables allows us to use them in our code.  Path is the route through our file system
// to a particular file, fs allows us to give instructions/direction within that file system, 
// and request-promise allows us to fetch/request information from the web.
const path = require('path');  
const fs = require('fs');
const rp = require('request-promise')

// Join allows us to declare a path through our file system without it being specific to our own computer.  
// This enables users on another device to still run our code with "__dirname" acting like a spotfiller
// for whatever the particular directory is on any computer that's running our code, ultimately leading up 
// to './favorite-albums.json.
let dataPath = path.join(__dirname, './favorite-albums.json');


// rp is requesting data from this API and then returning a promise(asynchronously) which is raw data.
rp('https://lukes-projects.herokuapp.com/v1/hiphop')
    .then(rawData => {
// I like to think of JSON.parse as taking our raw data and breaking it down into individual elements(scrapedData).
// We then map those invidual items to create a list, and request the pieces we want to display in our return.
// Our new scraped data is the result, consiting of the artist, title, and id of each individual album displayed 
// in a neatly organized list in the command line when console.logged.  This is only reading the data.
        const scrapedData = JSON.parse(rawData).result.map(album => {
            return {
                artist: album.artist,
                title: album.title,
                id: album.id
            }
        });
        // Stringify is taking our parsed/mapped data (scrapedData) and "stringing" it back together into an array
        // so that each individual, mapped object is now grouped together.
        // Then writeFile is saying, take what you are reading and write it, verbatum.
        // It is taking our newly created array and "writing" it to the dataPath, which directs it into the
        // './favorite-albums.json' file as JSON formatted data like it originally was in the API, but now only
        // containing the specific information we requested it to display.  This is writing the data to a file.
        fs.writeFile(dataPath,JSON.stringify(scrapedData, null, 4),(err) => {
            if (err) {
                console.log(err)
                return
            }
           console.log('Success!')
        })
    });

    