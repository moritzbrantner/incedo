# Incedo Coding Test

## Instructions

Write a Node.js REST API application that handles the following:

- Search for an artist by name based on the following endpoint artist.search, return all the results for this artist.
-  Write the result to a user-supplied CSV filename.
-  The CSV file should include the following information (name, mbid, url, image_small, image)

⇒ If no results returned from the artist.search endpoint, retrieve random artist names
from a JSON dictionary source file for example:

`[‘artistName1’, ‘artistName2’, ‘artistName3’]`

Repeat as necessary until you have gathered a list of artists

## Solution

use npm to install the packages.
Either by running `npm install`.

I wasn't entirely sure what was meant by the term "application" in the instructions.
It is a just a script that you run once for one name or is it an application that does stays running until names are requested?
In any case, it works both ways.

### How to run

You can run the program by running `node app.js`.
The CSV filename is `artists.csv` by default and can be changed by passing the filename as an argument.
Just append `--filename=<filename>` to the command line.

If you just want to lookup one name, you can append `--name=<name>` to the command line.

I wasn't sure too sure about what was meant by "JSON dictionary source file", since the example was just an array of strings, so I went with that.
But in any case, if the name is not found in the dictionary, it will use a random name from the dictionary.

Lastly, it was not entirely clear to me what to do with the random name.
I assume a search for the name should be done.