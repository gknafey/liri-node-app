# LIRI App

### Overview

LIRI is an app that takes two command line prompts and uses them to make API calls and then returns the information to the user in a formatted manner.

## How It Works

Once the LIRI app is open in the command line the user can use the following format to call different commands with the following responses.

node liri.js list

![list-command](\images\list-command.PNG)

node liri.js concert-this "Your Input Here"

![concert-this](\images\concert-this.PNG)

Then if no concert is available, this is displayed.

![concert-this-none](\images\concert-this-none.PNG)

node liri.js movie-this "Your Input Here"

![movie-this](\images\movie-this.PNG)

Then if no movie is specified then this is displayed as a default.

![movie-this-no-input](\images\movie-this-no-input.PNG)

node liri.js spotify-this-song "Your Input Here"

![spotify-this-song](\images\spotify-this-song.PNG)

Then if no song is specified then this is displayed as a default.

![spotify-this-song-no-input](\images\spotify-this-song-no-input.PNG)

node liri.js do-what-it-says

![do-what-it-says](\images\do-what-it-says.PNG)

## Code 

The first written variables detail the code to import necessary files and then the variables to capture the inputs. After that four functions are written out that are needed to follow the commands listed above. The following functions correspond the the commands listed above except for list which is listed in a switch case further down.
    * bandsInTownApi() runs from the command concert-this in the            command prompt
    * spotSearch() runs from the command spotify-this-song in the           command prompt
    * movieSearch() runs from the command movie-this in the command         prompt
    * makeItSo() runs from the command do-what-it-says in the command       prompt

After the functions are defined, the switch statement is written to take in the cases and apply the correct functions.

## Technologies Used

The app makes use of the following:
    * dotenv
    * axios
    * moment
    * fs
    * spotify

## My role

I coded all the liri.js file.