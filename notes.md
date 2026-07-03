
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

# COMMON HTTP CODES

HTTP status codes are grouped by their first digit:

- 1xx → Informational
- 2xx → Success
- 3xx → Redirection
- 4xx → Client errors
- 5xx → Server errors

## 1xx

- 100	Continue
- 101	Switching Protocols (e.g. WebSockets)
- 102	Processing

## 2xx

- 200 OK/Success
- 201 Created; A new resource was created.
- 202 Accepted; The request was accepted but will be processed later
- 204 No Content; common for DELETE

## 3xx

- 301 Moved Permanently; Permanent redirect.
- 302 Found; Temporary redirect.
- 304 Not Modified; Browser uses its cached copy.

# 4xx
- 400 Bad Request; invalid data
- 401 Unauthorized
- 403 Forbidden; Logged in, but not allowed.
- 404 meme
- 405 Method Not Allowed
- 409 Conflict
- 410 Gone; The resource existed but was intentionally removed.
- 415 Unsupported Media Type
- 422 Unprocessable Content; JSON valid but data in it not
- 429 Too Many Requests

# 5xx

- 500 Internal Server Error
- 501 Not Implemented
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout 
