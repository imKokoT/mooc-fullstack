
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

Run package / project:

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
