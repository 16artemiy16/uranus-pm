# Uranus PM

## Description
Project management system (aka Trello).
This is a back-end side, check also 
front-end [front-end](https://github.com/16artemiy16/uranus-pm-front). 

## Pre requirements
You need to install and run on your machine the next items: 
- [MongoDB](https://docs.mongodb.com/manual/installation/) - a document-oriented DBMS
- [RabbitMQ](https://www.rabbitmq.com/download.html) - a message broker

## Installation

```bash
$ npm install
```

## Configuration
The configuration files can be found in `config` folder.
It's already set up for local environment, you can change it manually.

- [MongoDB](config/mongo.config.ts)
- [RabbitMQ](config/rabbit.config.ts)

## Running the app

```bash
# run gateway
$ npm run start:dev

# run users microservice
$ npm run start:dev users

# run project management microservice
$ npm run start:dev pm

# run common library
$ npm run start:dev common
```
