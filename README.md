# mern-movies

This tutorial is my learning walk through of how to create a simple `MERN` ([MongoDB](https://www.mongodb.com/), [Express JS](https://expressjs.com/), [React JS](https://reactjs.org/) and [Node JS](https://nodejs.org/en/)) stack application.

Here is what means each letter of these acronym:
- **Mongo DB:** A document-based open source database, that provides you scalability and flexibility.
- **Express JS:** A structured base designed to develop web applications and APIs.
- **React JS:** A javascript Front-end library for building user interfaces. Maintained by Facebook.
- **Node JS:** A javascript runtime built on Chrome’s V8 JS engine.

I believe the best way to learn everything is doing a practical example, that means for this case I'm going to create a simple cinema’s movies CRUD (Create, Read, Update and Delete) form.

In the high level, the application will be like:

```bash
|---------------------|     |------------------------------|     |---------------------|
|                     |     |                              |     |                     |
| FrontEnd (React JS) |<--->| Backend RESTful (Express JS) |<--->| Database (Mongo DB) |
|                     |     |                              |     |                     |
|---------------------|     |------------------------------|     |---------------------|
```

## 1. Backend Development

Create an empty directory which will be the root of application.

```bash
$ mkdir mern-movies
$ cd mern-movies
```

(Optional) Running `git init` in an existing root application to a new Git repository.

```bash
$ git init
```

(Optional) Create a `.gitignore` file using `curl` command as following:

```bash
$ curl -sS "https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore" -o ".gitignore"
```

Create another empty folder `server` that will be backend folder.

```bash
$ mkdir server
$ cd server
```

The `package.json` file is a manifest for the Node.js project, it contains the metadata of it. We can manage the dependencies of the project and make scripts that will help you to install dependencies, to generate builds, to start, to run tests and other things.

Create the `package.json` file:

```bash
$ npm init -y
Wrote to /mern-movies/server/package.json:

{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Verify that the `package.json` file created:

```bash
$ ls
package.json
```

Let's install the package dependencies:

```bash
$ npm install express body-parser cors mongoose nodemon
```

This backend application uses following the package dependencies:

- **Express:** It’s the server framework (The E in MERN).
- **Body Parser:** Responsible to get the body off of network request.
- **Nodemon:** Restart the server when it sees changes (for a better dev experience).
- **Cors:** Package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **Mongoose:** It's an elegant MongoDB object modeling for node.js

The output will be like:

```bash
> nodemon@1.19.2 postinstall /home/dsw/projects/mongodb/github.com/danangsw/mern-movies/server/node_modules/nodemon
> node bin/postinstall || exit 0

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN server@1.0.0 No description
npm WARN server@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

+ cors@2.8.5
+ express@4.17.1
+ body-parser@1.19.0
+ nodemon@1.19.2
+ mongoose@5.7.0
added 284 packages from 170 contributors and audited 2455 packages in 18.911s
found 0 vulnerabilities
```

If you list the server folder, you will note that `node_modules` folder and `package-lock.json` file have been created.

```bash
$ ls
node_modules  package.json  package-lock.json
```

Setup `nodemon` on the `package.json` file:

```javascript
...
"scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

(Optional) Commit the changes to Git repository:
```bash
$ cd ..
$ git add .
$ git commit -m "Initial Commit"
[master (root-commit) bdaa3d4] Initial Commit
 4 files changed, 2948 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 server/package-lock.json
 create mode 100644 server/package.json
 
$ cd server/
```

Create the starting application file, named `index.js`:
```javascript
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})
```

To start the application:

```bash
$ npm run start

> server@1.0.0 start /home/dsw/projects/mongodb/github.com/danangsw/mern-movies/server
> nodemon index.js

[nodemon] 1.19.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] starting `node index.js`
Server running on port 3000...
```

Verify the server application:

```bash
$ curl "http://127.0.0.1:3000"
{"message":"Hello World!"}%  
```

(Optional) Commit the changes to Git repository.

## 1.1 Install MongoDB

To install, manage and securing the MongoDB server, you can just follow the steps [on this link](https://github.com/danangsw/mongodb-learning#step-1---installing-mongodb).

Login to your MongoDB server:

```bash
$ mongo -u admin -p --authenticationDatabase admin
MongoDB shell version v3.6.3
Enter password:
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.3
Server has startup warnings:
2019-09-12T08:32:44.704+0700 I STORAGE  [initandlisten]
2019-09-12T08:32:44.704+0700 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2019-09-12T08:32:44.704+0700 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
```

Creating the `cinema` database:
```bash
> use cinema
switched to db cinema
```

And that’s it, we’ve just created our database with these commands. 

Create the directory for database connection.
```bash
$ mkdir db
```

Create `index.js` file with following code:
```javascript
const mongoose = require('mongoose')

const MONGO_USERNAME = 'superadmin'
const MONGO_PASSWORD = 'superadmin123'
const MONGO_HOSTNAME = '127.0.0.1'
const MONGO_PORT = '27017'
const MONGO_DB = 'cinema'

const dburl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose
    .connect(dburl, {useNewUrlParser: true})
    .then(() => {
        console.log('mongoDB is connected...')
    })
    .catch(e => {
        console.error('Connection error: ', e.message)
    })

const db = mongoose.connection

module.exports = db
```

Update the main file `server/index.js` to be like:
```javascript
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
// import db/index.js
const db = require('./db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// add database connection response
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})
```

Your server tree directory will be like:
```bash
$ tree -I node_modules
.
└── server
    ├── db
    │   └── index.js
    ├── index.js
    ├── package.json
    └── package-lock.json
```

Running to test the result:
```bash
$ npm run start

> server@1.0.0 start /home/dsw/projects/mongodb/github.com/danangsw/mern-movies/server
> nodemon index.js

[nodemon] 1.19.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] starting `node index.js`
(node:20383) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Server running on port 3000...
mongoDB is connected...

```

(Optional) Commit the changes to Git repository.

**TIPS:** If you failed when run server application using node as following:
```bash
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (net.js:1279:14)
    at listenInCluster (net.js:1327:12)
    at Server.listen (net.js:1414:7)
```

Try to kill a nodejs process in linux:
```bash
$ sudo netstat -lpn |grep :'3000'
tcp    0     0 0.0.0.0:80     0.0.0.0:*     LISTEN      9631/node    
```
```bash
$ sudo kill -9 9631
```