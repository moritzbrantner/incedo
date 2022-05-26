const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const process = require('process');
const fs = require('fs');

//read the user-supplied arguments
const args = process.argv.slice(2);
let is_server = true;
let filename = "artists.csv";
let name = "";
args.forEach(arg => {
    if (arg.startsWith('--filename=')) {
        filename = arg.substring(11);
    }
    if (arg.startsWith('--name=')) {
        name = arg.substring(7);
        is_server = false;
    }
});
const api_key = "a40a24756e102f5c4db0f437fde29392";
const header = "name, mbid, url, image_small, image\n";
if (!fs.existsSync(filename)) {
    fs.writeFile(filename, header, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function writeArtistData(artists, filename) {
    artists.filter(artist => artist.mbid)
        .forEach(artist => {
            fs.appendFile(filename, `${artist.name}, ${artist.mbid}, ${artist.url}, ${artist.image[3]['#text']}, ${artist.image[4]['#text']}\n`, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
}

function searchForArtist(artistName, api_key) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${api_key}&format=json`;
    return axios.get(url).then(response => {
        return response.data.results.artistmatches.artist;
    });
}

function getRandomArtistname() {
    // read random artist name from file
    const artistNames = JSON.parse(fs.readFileSync('random_artist_names.json'));
    const randomIndex = Math.floor(Math.random() * artistNames.length);
    return artistNames[randomIndex];
}
if (is_server) {

    app.use(cors());
    app.get('/search', (req, res) => {
        // make request to https://www.last.fm/api/show/artist.search and get the response
        let name = req.query.name;

        searchForArtist(name, api_key).then(artists => {
            if(artists.length === 0) {
                name = getRandomArtistname();
                searchForArtist(name, api_key).then(artists => {
                    writeArtistData(artists, filename)
                });
            } else {
                writeArtistData(artists, filename);
            }
        });
        
    });
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
} else {
    searchForArtist(name, api_key).then(artists => {
        if(artists.length === 0) {
            name = getRandomArtistname();
            searchForArtist(name, api_key).then(artists => {
                writeArtistData(artists, filename)
            });
        } else {
            writeArtistData(artists, filename);
        }
    });
}