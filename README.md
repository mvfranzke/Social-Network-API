# Social Network API
Module # 18 NoSQL: Social Network API

## Description
This is the 18th assignment or challenge for our bootcamp class. Our assignment this week is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. Use Express.js for routing, MongoDB database and Mongoose ODM.

## Installation

Run the ```npm install``` to install all the dependencies

To execute, run ```node server```

## Usage

URL of Github repository : https://github.com/mvfranzke/Social-Network-API

Video Link (user flow)

User- GET, POST, PUT, DELETE ( creating new user, viewing users/by id, updating and deleting)
 * https://drive.google.com/file/d/1hgqf7dbUdaXo8Gtp-V8Sw1bHSBsWivF5/view

Friend - POST and DELETE ( adding and deleting a friend)
* https://drive.google.com/file/d/19ThSIY5sZ1QZgVpesdVAQLos1dcALvrN/view

Thought - GET, POST, PUT, DELETE ( creating a new thought, viewing all thoughts/by id, updating and deleting)
* https://drive.google.com/file/d/1ekBTx6wI6HHHujMsxNSPEOztOVC6UFSV/view

Reaction - POST, DELETE (adding and deleting reaction to a thought)
* https://drive.google.com/file/d/1F0QgoqqvWLz6UFPX-6hgT3KQL_Wdb11r/view

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Credits

Please see below additional resources:

* https://mongoosejs.com/docs/
* https://nodejs.org/en/docs


## License
N/A
