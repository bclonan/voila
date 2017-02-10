# Voilà
Convert HTML to Typeform on the fly.

**Lucho wanted to name it "Typeform on go", but Daniel didn't. So Mamón decided for us.*

## Install
1. Install Docker (https://www.docker.com/products/docker)
2. Clone this repository
3. Go to the folder you clone it
5. Run `docker-compose up`
6. Voilà

## Endpoints
The server has 2 endpoints that help run the middleware.
### Register your API key (yes, the police)
`/register`
Serves as a hash generator which generates a new key to be placed in the embed form to be converted (see, how to use it).
### Convert html to typeform (a.k.a the magic)
`/converter`
This endpoint works translating the json payload from the script to a .com API readable json and delivers the typeform created data back.

## Demo (the magic!)
After running the docker, open locally the `example.html` file, it will convert the current typeform as a demo of how this work. 

Feel free to modify it and play around.

## Cheers! 🍻
