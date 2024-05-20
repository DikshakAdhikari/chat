
# Chat Application

A Chat Application built using React.js, Node.js, Express.js, Socket.io and MongoDB.

## What is Socket.io and why It is used?  
Socket.IO is a JavaScript library that enables real-time, bidirectional, and event-based communication between web clients and servers. It builds on the WebSocket protocol and provides additional features, making it easier to implement and use in applications.

## Run Locally

Clone the project

```bash
  git clone https://github.com/DikshakAdhikari/chat-app.git
```

Go to the project directory

```bash
  cd chat-app
```

Install dependencies

```bash
  npm install
```

Start the React server locally

```bash
  cd client
  npm run dev
```

Start the Node.js server locally 

```bash
  cd server
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URI= /**Your Mongo connection URI**/`

`PORT= /**Custom Port**/`  

`JWT_SECRET_KEY= /**Your secret key**/`  

