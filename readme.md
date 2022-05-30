# Getting Started with Archgregator Front

This is a UI for [Archgregator](https://github.com/NuclearBlock/archgregator) tool

# Install

```
git clone https://github.com/NuclearBlock/archgregator_front.git
cd archgregator_front/
```

# Configuration

Create .env file in root directory. Use .env.example as a reference.

# Build react app

The following command will build react app from ./client:

```js
npm run build
```

# Run server

Start development server:

```js
npm start
```

or use PM2 tool for production:

```js
npm install -g pm2
pm2 start ./server/index.js
```

