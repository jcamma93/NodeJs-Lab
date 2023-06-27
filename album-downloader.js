const path = require('path');
const fs = require('fs');
const rp = require('request-promise')



// rp requests/fetches the data from this API and returns a promise which is our raw data.
rp('https://lukes-projects.herokuapp.com/v1/hiphop')
    .then(rawData => {
        // Parse pulls apart our raw data so that we can grab individual pieces.  Then forEach loops through
        // the collection of albums and requests (rp) the thumbnail image for each album in Base64 format and 
        // returns "media".  "Media" is a text representation of our image written in Base64 format.
        JSON.parse(rawData).result.forEach(album => {
            rp(album.thumbnail_image, { encoding: 'Base64' })
                .then(media => {
                    // We then need to create a path for how and where we want to save these images, so we 
                    // instruct the computer to make that path by joining together the following:
                    //  __dirname(C:\Users\1\Desktop\nodefun)/image/album-id#.jpg
                    const imagePath = path.join(__dirname, './image', 'album-' + album.id + path.extname(album.thumbnail_image))
                    // And finally, we need to download and save those images to the location we specified with our path.
                    // With writeFile, we are literally writing this information to a file and saving it.  Our image is in
                    // text format still, so we need to specify the format that "media" is encoded with (Base64) when
                    //  writing the file(s) so that the computer can translate it back into an actual image and save it.
                    fs.writeFile(imagePath, media, { encoding: 'Base64' }, (error) => {
                        if (error) {
                            console.log(error)
                            return
                        }
                    })
                })
        });
    });