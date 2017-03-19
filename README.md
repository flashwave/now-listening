# now listening
A replacement for the old /now page on lastfm profiles!

## Usage
https://now.flash.moe/#/{username}

## Configuration
Create an application [here](https://www.last.fm/api/account/create), take the api and place it in a file called `.apikey` in the root (*not the public dir*).

## Building
To compile the LESS and TypeScript assets you need to have the individual compilers installed,
both are available through yarn and can be installed with the following command:
`yarn global add less typescript`.

After that just run `build.sh`.

The server side uses a PHP script with dependencies to fetch the data without exposing the API key.
To install these dependencies you're going to need [composer](https://getcomposer.org/).
After installing composer you can simply run `composer install` in the root directory.
