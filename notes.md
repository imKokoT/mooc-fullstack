
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

> **no body in response**

## 2xx

- 200 OK/Success
- 201 Created; A new resource was created.
- 202 Accepted; The request was accepted but will be processed later
- 204 No Content; common for DELETE; **no body in response**

## 3xx

- 301 Moved Permanently; Permanent redirect.
- 302 Found; Temporary redirect.
- 304 Not Modified; Browser uses its cached copy; **no body in response**

## 4xx
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

## 5xx

- 500 Internal Server Error
- 501 Not Implemented
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout 

# Same origin policy and CORS

The issue lies with a thing called same origin policy. A URL's origin is defined by the combination of protocol (AKA scheme), hostname, and port.

When you visit a website (e.g. http://example.com), the browser issues a request to the server on which the website (example.com) is hosted. The response sent by the server is an HTML file that may contain one or more references to external assets/resources hosted either on the same server that example.com is hosted on or a different website. When the browser sees reference(s) to a URL in the source HTML, it issues a request. If the request is issued using the URL that the source HTML was fetched from, then the browser processes the response without any issues. However, if the resource is fetched using a URL that doesn't share the same origin(scheme, host, port) as the source HTML, the browser will have to check the Access-Control-Allow-origin response header. If it contains * on the URL of the source HTML, the browser will process the response, otherwise the browser will refuse to process it and throws an error.

The same-origin policy is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities.

In order to enable legitimate cross-origin requests (requests to URLs that don't share the same origin) W3C came up with a mechanism called CORS(Cross-Origin Resource Sharing)

In your backend repository, install cors with the command:

```sh
npm install cors
```

take the middleware to use and allow for requests from all origins:

```sh
const cors = require('cors')

app.use(cors())
```

However, certain resources are considered safe to embed:

- images
- CSS
- videos
- fonts (sometimes with restrictions)
- scripts

# BUILD VITE PROJECT

```sh 
npm run build
```

*dist* folder is a product
