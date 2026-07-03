
# NPM

Local initialization of JS environment:

```sh
npm init -y
```

Toolchain for project creation:

```sh
npm create vite@latest
```

Install project's deps:

```sh
nmp install
# or
nmp i
```

Run script from package.json:

```sh
nmp run [entry name]
```

# JSON-SERVER

Handy tool during development. Allows to run comfortable json db server.

```sh
npm install json-server --save-dev # --save-dev option would save package as developer dep
```

Now important to add entry to *package.json*:
```json
{
  // ... 
  "scripts": {
    // ...
    "db": "json-server -p 3000 db.json"  
  },
}
```

```sh
npm run db
```

# AXIOS

Modern way to setup async communication browser to server

```sh
npm install axios
```

# EXPRESS

One of popular libraries to implement backend

```sh
npm i express
```

# Automatic Change Tracking

You can make the server track our changes by starting it with the --watch option:

```sh
node --watch index.js
```

or even better:

```json
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",    
"test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```
