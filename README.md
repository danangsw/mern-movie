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
```