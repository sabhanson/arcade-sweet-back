# Arcade-Sweet a react app for simple games [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 


## Description
Arcade-Sweet is a react app for simple games that is community powered.
Users can play a "sweet" of games that are tracked by highscores and earn badges for overall wins!
They can also post reviews of the games to give feedback for other players to read and make desicions on what games to play.
This is the API used in the [deployment](https://arcade-sweet.herokuapp.com/) of our application.


## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Technology](#technology)
- [Questions](#questions)

## Installation  

### For Developers
Interested in a template for your own api for a game website built in mongoDB? ⬇️

- Clone this repo to the users computer by running the command in the terminal.

`git clone <ssh key>`

- Open VScode with this repository and run the following command with the integrated terminal.

`npm i`

- The user will have to have MongoDB installed on their computer. Click [here](https://docs.mongodb.com/manual/installation/) to learn how to install MongoDB

- To launch the application on the user's local computer, the following command will need to be ran

`node server.js`



Now you are all done with the api installation, to install the front-end visit [the front end reopsoitory](https://github.com/sabhanson/arcade-sweet-front).✅
## Usage

The user can install this application on their local maching by following the instructions above. The demo for this program uses Insomnia to execute CRUD requests. To learn how to use and install insomnia click [here](https://insomnia.rest/)

Visit the [deployed webiste](https://powerful-badlands-74006.herokuapp.com/) and use any URL end-point provided here:
| Url endpoint| User Routes |
| ----------- | ----------- |
| /api/users/login/     | Post request to login  (requires username and password in request body)|
| /api/users/signup/  | Post resuest to signup    (requires username, password and email in request body)     |
| /api/users/score/   | Post request to get score data (requires user to be logged in and gamevalue in request body)       |
| **Url endpoint**| **User Profile Routes** |
| /api/userProfile/allProfiles/  | Get request to gather all users        |
| /api/userProfile/Profile/:token/  | Get request to target one user based on decoded JWT  |
| /api/userProfile/  | Put request for updating profile information        |
| /api/userProfile/avatarUpdate/   | Put request for updating profile avatar        |
| **Url endpoint**| **Score Routes** |
| /api/scores/   | Get request to get all scores        |
| /api/scores/   | Post request to create a new score (requires gamevalue, score, and username in request body)       |
| /api/scores/top/   | Post request to find top three scores (requires gamevalue in request body)       |
| /api/scores/wordle  | Post request to get wordle score data (requires gamevalue in request body)        |
| **Url endpoint**| **Review Routes** |
| /api/reviews/   | Post request to create a new review (requires review, gamevalue, username, imgSrc in the request body)        |
| /api/reviews/latest   | Post request to find the latest reviews (requires gamevalue in the request body)        |

Below is the Api being hosted on a local machine and being testing in insomnia


![GIF of api usage](./assets/backend.gif)  


## License
<p>
MIT License

  Copyright &copy; 2022 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  </p>

## Tests
All tests were performed and passed by the developer team.

## Technology
* [Mongoose](https://mongoosejs.com/) Database Query 
* [MongoDB](https://www.mongodb.com/) Database
* [Express](https://expressjs.com/) web framework for Node.js
* [Atlas](https://www.mongodb.com/atlas/database) Deployed DB infastructure
* [Heroku](https://www.heroku.com/home) react npm package
* [Bcrypt](https://www.npmjs.com/package/bcrypt) cloud application platform
* [JsonWebToken](https://jwt.io/)) No session authentication for communication between front and back end


## Questions
Contact the developers ⬇️
* Isaac Petersen [Github](http://www.github.com/idpetersen) | [Email](mailto:isaac.petersen5@gmail.com)
* Sabrina Hanson [Github](http://www.github.com/sabhanson) | [Email](mailto:sabhanson7@gmail.com)
* Parul Raj [Github](https://github.com/sinka27) | [Email](mailto:parulraj27392@gmail.com)
* Megan McLean [Github](http://www.github.com/425megs) | [Email](mailto:425megs@gmail.com)
