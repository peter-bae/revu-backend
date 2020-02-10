## Backend for Rev U Project

### Requirements

Rev U Backend service exposes the API for Rev U front-end.
It's a Node.js application. In order to start developing you have to install:

```
npm
node
docker
```
### Install dependencies

```
npm install
docker pull mongo
```

### Start on test mode (localhost)

```
docker run --name revu-db -p 27017:27017 -d mongo
npm test
```

To make docker-compose work, you must replace on `package.json`:
```
"test": "DB_CONNECTION=mongodb://localhost:27017/revu-db node ./bin/www"
```
by
```
"test": "DB_CONNECTION=mongodb://mongo:27017/revu-db node ./bin/www"
```
