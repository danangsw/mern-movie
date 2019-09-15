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

Create the starting application file, named `server/index.js`:
```bash
$ nano server/index.js
```

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
$ nano db/index.js
```

Create `db/index.js` file with following code:
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

>
>**TIPS:** If you failed when run server application using node as following:
>```bash
>Error: listen EADDRINUSE: address already in use :::3000
>    at Server.setupListenHandle [as _listen2] (net.js:1279:14)
>    at listenInCluster (net.js:1327:12)
>    at Server.listen (net.js:1414:7)
>```
>
>Try to kill a nodejs process in linux:
>```bash
>$ sudo netstat -lpn |grep :'3000'
>tcp    0     0 0.0.0.0:80     0.0.0.0:*     LISTEN      9631/node    
>```
>```bash
>$ sudo kill -9 9631
>```
>

### 1.1.1. Creating Schema Movie

Let’s create a folder called `models` and add a file called `movie-model.js`.

```bash
$ mkdir models
$ nano models/movie-model.js
```

Creating schema for movie model in the file `models/movie-model.js`.

```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        title: { type: String, required: true },
        synopsis: { type: String, required: true },
        director: { type: String, required: true },
        writers: { type: [String], required: true },
        stars: { type: [String], required: true },
        rating: { type: Number, required: true, min: 0, max: 10 },
        showtimes: { type: [String], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)

```

The project directory tree will be like:

```bash
$ tree ../. -I node_modules
../.
└── server
    ├── db
    │   └── index.js
    ├── index.js
    ├── models
    │   └── movie-model.js
    ├── package.json
    └── package-lock.json
```

### 1.2. Creating Routes

We will create all the CRUD operations and create our REST endpoints. 

Let’s create two more folders on the server: `routes` and `controllers`. In the route folder, let’s create the file `routes/movie-router.js` and in the controller folder, `controllers/movie-controller.js`.

```bash
$ mkdir routes controllers
```
Add file movie controller `controllers/movie-controller.js`:

```bash
$ nano controllers/movie-controller.js
```

```javascript
const Movie = require('../models/movie-model')

createMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to create!',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: 'Failed to mapping a body data to movie schema!' })
    }

    await Movie.find({ title: movie.title, director: movie.director }, (error, movies) => {
        if(movies && movies.length > 0) {
            return res.status(400).json({ success: false, error: 'Failed to create. Duplicate data!' })
        }

        movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            console.error(error)
            return res.status(400).json({
                error,
                message: 'Failed to create movie!',
            })
        })
    })
}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update!',
        })
    }

    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        movie.title = body.title ? body.title : movie.title
        movie.synopsis = body.synopsis ? body.synopsis : movie.synopsis
        movie.director = body.director ? body.director : movie.director
        movie.writers = body.writers ? body.writers : movie.writers
        movie.stars = body.stars ? body.stars : movie.stars
        movie.rating = body.rating ? body.rating : movie.rating
        movie.showtimes = body.showtimes ? body.showtimes : movie.showtimes
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                console.error(error)
                return res.status(404).json({
                    error,
                    message: 'Failed to update Movie!',
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie, message: 'Movie deleted!' })
    })
    .catch(error => {
        console.error(error)
        return res.status(400).json({
            error,
            message: 'Failed to delete Movie!',
        })
    })
}

findMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie })
    })
    .catch(error => {
        console.error(error)
        return res.status(400).json({
            error,
            message: 'Failed to find a Movie!',
        })
    })
}

findAllMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (!movies | !movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movies })
    })
    .catch(error => {
        console.error(error)
        return res.status(400).json({
            error,
            message: 'Failed to find all Movie!',
        })
    })
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    findMovieById,
    findAllMovies
}

```

Add file movie route `routes/movie-router.js`:

```bash
$ nano routes/movie-router.js
```

```javascript
const express = require('express')

const MovieController = require('../controllers/movie-controller')

const router = express.Router()

router.post('/movie', MovieController.createMovie)
router.put('/movie/:id', MovieController.updateMovie)
router.delete('/movie/:id', MovieController.deleteMovie)
router.get('/movie/:id', MovieController.findMovieById)
router.get('/movies', MovieController.findAllMovies)

module.exports = router

```

The project directory tree will be like:

```bash
tree ../. -I node_modules
../.
└── server
    ├── controllers
    │   └── movie-controller.js
    ├── db
    │   └── index.js
    ├── index.js
    ├── models
    │   └── movie-model.js
    ├── package.json
    ├── package-lock.json
    └── routes
        └── movie-router.js
```

(Optional) Commit the changes to Git repository.

### 1.3. Testing the Backend API

To test the API application we will use Postman. You can import [these collection file](/server/data-testing/MERN.postman_collection.json) to Postman.

Go to [here](https://www.getpostman.com/downloads/) and choose your desired platform among Mac, Windows or Linux. Click Download.

Follow [this tutorial](https://www.guru99.com/postman-tutorial.html) to learn Postman for beginners with API Testing example.

## 2. Frontend Development

Frontend is all of the visual part, where user will interact with the application.

We will use [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app), the recommended toolchains for a new frontend single-page application in React.

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 8.10 and npm >= 5.6 on your machine. 

Create React App doesn’t handle backend logic or databases; it just creates a frontend build pipeline, so you can use it with any backend you want. Under the hood, it uses [Babel](https://babeljs.io/) and [webpack](https://webpack.js.org/), but you don’t need to know anything about them.

To create a project, run:

```bash
$ npx create-react-app client
$ cd client
$ npm start
```

```bash
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.43.32:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Try to open the application url `http://localhost:3000` in your browser. If you see the React logo, then you've done right.

To stop the client service use `CTRL + C`.

> 
>**TIPS:** The default port for your client is 3000, but have already set this port to the Backend app. We can change the port for client to 8000.
>
>```javascript
>  "scripts": {
>    "start": "PORT=8080 react-scripts start",
>    "build": "react-scripts build",
>    "test": "react-scripts test",
>    "eject": "react-scripts eject"
>  },
>```
>

If you notice, the React creates some default directories and files. Let's see the client tree directory

```bash
$ tree -I node_modules .
.
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

For now we don't need to worry about these files.

>
> **TIPS:** We can remove the unnecessaries files that don't need to the project:
> ```bash
> $ rm src/App.css src/index.css src/App.test.js src/serviceWorker.js
> ```
> 

Setup the package depedencies for the client project. We will need :
- **[axios](https://github.com/axios/axios):** It’s a promise-based the asynchronous code. It’s the most popular promise based HTTP.
- **[bootstrap](https://getbootstrap.com/):** It’s is an open-source toolkit and the most popular front-end component library where allows you for developing with HTML, CSS, and JS.
- **[styled-components](https://www.styled-components.com/)**: It allows you to write actual CSS code to style your components.
- **[react-table](https://github.com/tannerlinsley/react-table)**: It’s a lightweight, fast and extendable data grid built for React.
- **[react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)**: DOM bindings for React Routers.

```bash
$ npm install styled-components react-table react-router-dom axios bootstrap --save
```

>
> **TIPS:** If you found some warning message, i.e `npm WARN @...`, you can install the depedencies warning for example:
> ```bash
> $ npm install eslint typescript jquery popper.js --save-dev
> ```
> 

### 2.1. Setup FrondEnd Folder Structure
The `src` directory will be the main directory for the client application. We will create following directory in the `src` directory: `api`, `app`, `components`, `pages`, `style`.

```bash
$ cd src
$ mkdir api app components pages style
$ touch api/index.js app/index.js components/index.js pages/index.js style/index.js
```

Move the `App.js` file to `app` directory, then renaming it to `index.js`:
```bash
$ mv App.js app/index.js
```

From now, the client tree directory will be like:

```bash
$ tree -I node_modules .
.
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
└── src
    ├── api
    │   └── index.js
    ├── app
    │   └── index.js
    ├── components
    │   └── index.js
    ├── index.js
    ├── logo.svg
    ├── pages
    │   └── index.js
    └── style
        └── index.js
```

Update the file `client/src/index.js` to be:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
```

### 2.2. Developing Components

Create the components of client application as following:

```bash
$ touch components/NavigationBar.jsx components/Logo.jsx components/Links.jsx
$ ls components
```

> [JSX](https://reactjs.org/docs/introducing-jsx.html) is a syntax **J**ava**S**cript e**X**tension. It’s recommended to use it with React to describe what the UI should look like. JSX produces React `elements` taht rendereing them to the DOM.

Create file `components/Logo.jsx` that will be like:

```javascript
import React, { Component } from 'react'
import Styled from 'styled-components'
import logoImage from '../logo.svg'

const Wrapper = Styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="http://ubuntu.vbox:8080">
                <img src={logoImage} width="50" height="50" alt="http://ubuntu.vbox:8080" />
            </Wrapper>
        )
    }
}

export default Logo

```

Then, create file `components/Links.jsx` that will be like:

```javascript
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Styled from "styled-components"

const Collapse = Styled.div.attrs({
    className: 'collapse navbar-collapse'
})``

const List = Styled.div.attrs({
    className: 'navbar-nav mr-auto'
})``

const Item = Styled.div.attrs({
    className: 'collapse navbar-collapse'
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    A Simple MERN Movie Application 
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/" className="nav-link">
                                Movies 
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/" className="nav-link">
                                Create Movie 
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links

```

Then, create file `components/NavigationBar.jsx` that will be like:

```javascript
import React, { Component } from 'react'
import Styled from "styled-components"

import Links from './Links'
import Logo from './Logo'

const Container = Styled.div.attrs({
    className: 'container'
})``

const Nav = Styled.div.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark'
})`
    margin-bottom: 20px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        ) 
    }
}

export default NavBar

```

Let's update the file `components/index.js`, it will export our components:

```javascript
import Links from './Links'
import Logo from './Logo'
import NavBar from './NavigationBar'

export { Links, Logo, NavBar }
```

Modify the file `app/index.js` as following:

```javascript
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from '../components'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar />
    </Router>
  )
}

export default App

```

From now, the client directory tree will be like:

```bash
$ tree -I node_modules .
.
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
└── src
    ├── api
    │   └── index.js
    ├── app
    │   └── index.js
    ├── components
    │   ├── index.js
    │   ├── Links.jsx
    │   ├── Logo.jsx
    │   └── NavigationBar.jsx
    ├── index.js
    ├── logo.svg
    ├── pages
    │   └── index.js
    └── style
        └── index.js
```

Then verify the frontend app from your browser `http://localhost:8080`.

(Optional) Commit the changes to Git repository.

### 2.3. Integrating FrontEnd with BackEnd API

Update the file `api/index.js`:

```javascript
```

Create following application's pages in folder `pages`: : `MoviesList.jsx`, `MoviesInsert.jsx` and `MoviesUpdate.jsx`.

```bash
$ touch pages/MovieList.jsx pages/MovieCreate.jsx pages/MovieUpdate.jsx
```

Update the file `pages/MovieList.jsx` as following:

```javascript
import React, { Component } from 'react'
import ReactTable from 'react-table'
import movieAPI from '../api'

import Styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = Styled.div`
    padding: 0 40x 40x 40x;
`
const Update = Styled.div`
    color: #0000ff;
    cursor: pointer;
`

const Delete = Styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateMovie extends Component {
    updateMovie = event => {
        event.preventDefault()

        window.location.href = `/movie/update/${this.props.id}`
    }

    render() {
        return <Update onClick={ this.updateMovie }>Edit</Update>
    }
}

class DeleteMovie extends Component {
    deleteMovie = event => {
        event.preventDefault()

        if(
            window.confirm(`Do you want to delete the movie ${this.props.id} permanently?`)
        ) {
            movieAPI.deleteMovie(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={ this.deleteMovie }>Delete</Delete>
    }
}

class MovieList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await movieAPI.getAllMovies()
            .then(movies => {
                this.setState({
                    movies: movies.data.data,
                    isLoading: false,
                })
            })
            .catch( error => {
                this.setState({
                    movies: [],
                    isLoading: true,
                })
            })
    }

    render() {
        const { movies, isLoading } = this.state
        console.log('TCL: MovieList -> render -> movies', movies)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
                show: false
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Stars',
                accessor: 'stars',
                filterable: true,
                Cell: props => <span>{ props.value.join(', ')}</span>
            },
            {
                Header: 'Showtimes',
                accessor: 'showtimes',
                Cell: props => <span>{ props.value.join(' | ')}</span>
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showtable = true

        if (!movies.length) {
            showtable = false
        }

        return (
            <Wrapper>
                { showtable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default MovieList
```

Update the file `pages/index.js`

```javascript
import MovieList from './MoviesList'

export { MovieList }
```

Update the file `app/index.js`:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MovieList } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar />
        <Switch>
            <Route path="/movie/list" exact component={MovieList} />
        </Switch>
    </Router>
  )
}

export default App

```

Verify the frontend and backend integration:
1. Running the backend API server
```bash
$ cd server
$ npm run start
```

2. Running the frontend server
```bash
$ cd client
$ npm start
```

3. Open the frontend app from your browser `http://localhost:8080`
If you see the movie list table with your movie data, you have done right.

>**TIPS** If you open the frontend app in your browser then you get error like: `GET http://localhost:3000/api/v0.1/movies net::ERR_CONNECTION_REFUSED`. Try to fix using following solution:
>1. In the file `client/src/api/index.js`, modify the baseUrl API to be the host or server IP address instead of localhost or 127.0.0.1, i.e: 
> ```javascript
>...
>const api = Axios.create({
>    baseURL: 'http://192.168.33.44:3000/api/v0.1'
>   //instead of baseURL: 'http://localhost:3000/api/v0.1' 
>})
> ...
>```

(Optional) Commit the changes to your GIT repository.

Let's continue to completing the create and update pages.

Update the file `pages/MovieCreate.jsx` as following:

```javascript
import React, { Component } from 'react'
import movieAPI from '../api'

import Styled from 'styled-components'

const Title = Styled.h1.attrs({
    className: 'h1',
})``

const Wrapper =  Styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = Styled.label`
    margin: 5px;
`

const InputText = Styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const SubmitButton = Styled.button.attrs({
    className: 'btn btn-primary',
})`
    margin: 15px 15px 15px 5px; 
`

const CancelButton = Styled.a.attrs({
    className: 'btn btn-danger',
})`
    margin: 15px 15px 15px 5px; 
`

class MovieCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            synopsis: '',
            director: '',
            writers: '',
            stars: '',
            rating: '0',
            showtimes: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputSynopsis = async event => {
        const synopsis = event.target.value
        this.setState({ synopsis })
    }

    handleChangeInputDirector = async event => {
        const director = event.target.value
        this.setState({ director })
    }

    handleChangeInputWriters = async event => {
        const writers = event.target.value
        this.setState({ writers })
    }

    handleChangeInputStars = async event => {
        const stars = event.target.value
        this.setState({ stars })
    }

    handleChangeInputShowtimes = async event => {
        const showtimes = event.target.value
        this.setState({ showtimes })
    }

    handleSubmitMovie = async event => {
        const {
            title,
            synopsis,
            director,
            writers,
            stars,
            rating,
            showtimes,
        } = this.state

        const writersToArr = writers.split(', ')
        const starsToArr = stars.split(', ')
        const showtimesToArr = showtimes.split(', ')

        const payload =  {
            title,
            synopsis,
            director,
            writers: writersToArr,
            stars: starsToArr,
            rating,
            showtimes: showtimesToArr,
        }

        await movieAPI.createMovie(payload)
            .then(data => {
                window.alert(`Movie created successfully!`)

                this.state = {
                    title: '',
                    synopsis: '',
                    director: '',
                    writers: '',
                    stars: '',
                    rating: '0',
                    showtimes: '',
                }
            })
            .catch(error => {
                console.error(error)
                window.alert(`Failed to create Movie!`)
            })
    }

    render() {
        const {
            title,
            synopsis,
            director,
            writers,
            stars,
            rating,
            showtimes,
        } = this.state

        return(
            <Wrapper>
                <Title>Create Movie</Title>
                
                <Label>Title: </Label>
                <InputText type="text" value={title} onChange={this.handleChangeInputTitle}
                    placeholder="(Required) i.e. Titanic"
                />

                <Label>Rating: </Label>
                <InputText type="number" value={rating} onChange={this.handleChangeInputRating}
                    placeholder="(Required) i.e. 7.7"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                />

                <Label>Synopsis: </Label>
                <InputText type="text" value={synopsis} onChange={this.handleChangeInputSynopsis}
                    placeholder="(Required) i.e. A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
                />

                <Label>Director: </Label>
                <InputText type="text" value={director} onChange={this.handleChangeInputDirector}
                    placeholder="(Required) i.e. James Cameron"
                />

                <Label>Writers: </Label>
                <InputText type="text" value={writers} onChange={this.handleChangeInputWriters}
                    placeholder="(Required) i.e. James Cameron, John Doe"
                    pattern=",\s+(?=(?:(?:[^']*'){2})*[^']*$)"
                />

                <Label>Stars: </Label>
                <InputText type="text" value={stars} onChange={this.handleChangeInputStars}
                    placeholder="(Required) i.e. Leonardo DiCaprio, Kate Winslet, Billy Zane"
                    pattern=",\s+(?=(?:(?:[^']*'){2})*[^']*$)"
                />

                <Label>Showtimes: </Label>
                <InputText type="text" value={showtimes} onChange={this.handleChangeInputShowtimes}
                    placeholder="(Required) i.e. 12:30, 13:30, 14:30"
                    pattern="^(([0-1]?[0-9]|2[0-3]):[0-5][0-9])(?:,\s*(([0-1]?[0-9]|2[0-3]):[0-5][0-9]*?))*$"
                />

                <SubmitButton onClick={this.handleSubmitMovie}>Add</SubmitButton>
                <CancelButton href={'/movie/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MovieCreate
```

Update the file `pages/MovieUpdate.jsx` as following:

```javascript
import React, { Component } from 'react'
import movieAPI from '../api'

import Styled from 'styled-components'

const Title = Styled.h1.attrs({
    className: 'h1',
})``

const Wrapper =  Styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = Styled.label`
    margin: 5px;
`

const InputText = Styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const SubmitButton = Styled.button.attrs({
    className: 'btn btn-primary',
})`
    margin: 15px 15px 15px 5px; 
`

const CancelButton = Styled.a.attrs({
    className: 'btn btn-danger',
})`
    margin: 15px 15px 15px 5px; 
`

class MovieUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id:this.props.match.params.id,
            title: '',
            synopsis: '',
            director: '',
            writers: '',
            stars: '',
            rating: '0',
            showtimes: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputSynopsis = async event => {
        const synopsis = event.target.value
        this.setState({ synopsis })
    }

    handleChangeInputDirector = async event => {
        const director = event.target.value
        this.setState({ director })
    }

    handleChangeInputWriters = async event => {
        const writers = event.target.value
        this.setState({ writers })
    }

    handleChangeInputStars = async event => {
        const stars = event.target.value
        this.setState({ stars })
    }

    handleChangeInputShowtimes = async event => {
        const showtimes = event.target.value
        this.setState({ showtimes })
    }

    handleUpdateMovie = async event => {
        const {
            id,
            title,
            synopsis,
            director,
            writers,
            stars,
            rating,
            showtimes,
        } = this.state

        const writersToArr = writers.split(', ')
        const starsToArr = stars.split(', ')
        const showtimesToArr = showtimes.split(', ')

        const payload =  {
            title,
            synopsis,
            director,
            writers: writersToArr,
            stars: starsToArr,
            rating,
            showtimes: showtimesToArr,
        }

        await movieAPI.updateMovie(id, payload)
            .then(data => {
                window.alert(`Movie updated successfully!`)

                this.state = {
                    title: '',
                    synopsis: '',
                    director: '',
                    writers: '',
                    stars: '',
                    rating: '0',
                    showtimes: '',
                }
            })
            .catch(error => {
                console.error(error)
                window.alert(`Failed to update Movie!`)
            })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const movie = await movieAPI.getMovieById(id)

        this.setState({
            title: movie.data.data.title,
            synopsis: movie.data.data.synopsis,
            director: movie.data.data.director,
            writers: movie.data.data.writers ? movie.data.data.writers.join(', ') : '',
            stars: movie.data.data.stars ? movie.data.data.stars.join(', ') : '',
            rating: movie.data.data.rating,
            showtimes: movie.data.data.showtimes ? movie.data.data.showtimes.join(', ') : '',
        })
    }

    render() {
        const {
            title,
            synopsis,
            director,
            writers,
            stars,
            rating,
            showtimes,
        } = this.state

        return(
            <Wrapper>
                <Title>Update Movie</Title>
                
                <Label>Title: </Label>
                <InputText type="text" value={title} onChange={this.handleChangeInputTitle}
                    placeholder="(Required) i.e. Titanic"
                />

                <Label>Rating: </Label>
                <InputText type="number" value={rating} onChange={this.handleChangeInputRating}
                    placeholder="(Required) i.e. 7.7"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                />

                <Label>Synopsis: </Label>
                <InputText type="text" value={synopsis} onChange={this.handleChangeInputSynopsis}
                    placeholder="(Required) i.e. A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
                />

                <Label>Director: </Label>
                <InputText type="text" value={director} onChange={this.handleChangeInputDirector}
                    placeholder="(Required) i.e. James Cameron"
                />

                <Label>Writers: </Label>
                <InputText type="text" value={writers} onChange={this.handleChangeInputWriters}
                    placeholder="(Required) i.e. James Cameron, John Doe"
                    pattern=",\s+(?=(?:(?:[^']*'){2})*[^']*$)"
                />

                <Label>Stars: </Label>
                <InputText type="text" value={stars} onChange={this.handleChangeInputStars}
                    placeholder="(Required) i.e. Leonardo DiCaprio, Kate Winslet, Billy Zane"
                    pattern=",\s+(?=(?:(?:[^']*'){2})*[^']*$)"
                />

                <Label>Showtimes: </Label>
                <InputText type="text" value={showtimes} onChange={this.handleChangeInputShowtimes}
                    placeholder="(Required) i.e. 12:30, 13:30, 14:30"
                    pattern="^(([0-1]?[0-9]|2[0-3]):[0-5][0-9])(?:,\s*(([0-1]?[0-9]|2[0-3]):[0-5][0-9]*?))*$"
                />

                <SubmitButton onClick={this.handleUpdateMovie}>Save</SubmitButton>
                <CancelButton href={'/movie/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MovieUpdate
```

Update the file `pages/index.jsx` as following:

```javascript
import MovieList from './MoviesList'
import MovieCreate from './MovieCreate'
import MovieUpdate from './MovieUpdate'

export { MovieList, MovieCreate, MovieUpdate }
```

Update the file `app/index.js`:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MovieList, MovieCreate, MovieUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar />
        <Switch>
            <Route path="/movie/list" exact component={MovieList} />
            <Route path="/movie/create" exact component={MovieCreate} />
            <Route path="/movie/update/:id" exact component={MovieUpdate} />
        </Switch>
    </Router>
  )
}

export default App

```

From now We have done to develop the simple MERN application. So far the project directory tree will be like:

```bash
.
├── client
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src
│       ├── api
│       │   └── index.js
│       ├── app
│       │   └── index.js
│       ├── components
│       │   ├── index.js
│       │   ├── Links.jsx
│       │   ├── Logo.jsx
│       │   └── NavigationBar.jsx
│       ├── index.js
│       ├── logo.svg
│       ├── pages
│       │   ├── index.js
│       │   ├── MovieCreate.jsx
│       │   ├── MovieList.jsx
│       │   └── MovieUpdate.jsx
│       └── style
│           └── index.js
├── README.md
└── server
    ├── controllers
    │   └── movie-controller.js
    ├── data-testing
    │   ├── MERN.postman_collection.json
    │   ├── sample-body-request-1.json
    │   ├── sample-body-request-2.json
    │   └── sample-body-request-3.json
    ├── db
    │   └── index.js
    ├── index.js
    ├── models
    │   └── movie-model.js
    ├── package.json
    ├── package-lock.json
    └── routes
        └── movie-router.js
```
Verify the frontend and backend integration:
1. Running the backend API server
```bash
$ cd server
$ npm run start
```

2. Running the frontend server
```bash
$ cd client
$ npm start
```

Running the MERN application in your browser: `http://localhost:8000`