# Open Music API

Dicoding Fundamental Back End Submission

# V1: 
- Get, Add, Edit, Delete Song using PostgreSQL Database
- Data Validation using Joi
- Error Handling (to advoid boiler plate)
- Using Eslint with Airbnb style guide

# V2: 
- Authentication using JWT Token (login, refresh access token, logout)
- Database Normalization (playlist collaborations)
- Get, Add, Delete Playlist
- Add, Get, Delete Song to Playlist with Authorizatization (for owner & collaborator)

# V3: 
- Export Song from Playlist (message broker implemented using RabbitMQ)
- Image Upload (local storage implemented)
- Server-Side Cache (using redis)

# Setup:
- npm install
- npm run migrate up
- npm run start-dev

# Tools: 
- Node.js
- Hapi Framework
- PostgreSQL
- Eslint
- JSON Web Token (JWT)
- Joi
- RabbitMQ
- Redis
- Postman

# .env

# server configuration
HOST=localhost

PORT=5000
 
# node-postgres configuration
PGUSER=developer

PGHOST=localhost

PGPASSWORD= your postgreSQL passowrd

PGDATABASE=songsapp

PGPORT=5432

# JWT Token
ACCESS_TOKEN_KEY= 

REFRESH_TOKEN_KEY=

ACCESS_TOKEN_AGE=1800

# Message broker
RABBITMQ_SERVER=amqp://localhost

# Redis
REDIS_SERVER=localhost
