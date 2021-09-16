# tko-signin

two backend devs make a data visualizer

# General:
For google oauth, make sure to register callback urls into google console

## Normal Config:
Create two env files, one in the root directory of `/backend` and the other in the root directoy of `/frontend`.  
Backend: 
```
SECRET=supersecretsecretsyay
MONGODB=mongodb://localhost:27017/signin
BACKEND_URL=<backend url>
FRONTEND_URL=<frontend url>
clientID=<clientId from google console>
clientSecret=<clientSecret from google console>
```
Frontend:
```
VUE_APP_API_URL=http://localhost:3000 //this is the same as `BACKEND_URL`
```

## Docker Config
Create a single `.env` file in the root directory.
```
SECRET=<secret>
MONGODB=<mongodb address>
BACKEND_URL=<backend url>
FRONTEND_URL=<frontend url>
clientID=<clientId from google console>
clientSecret=<clientSecret from google console>
MONGO_INITDB_ROOT_USERNAME=<username>
MONGO_INITDB_ROOT_PASSWORD=<password>
```
The last two env variables are only needed if you want to run mongodb with docker compose. If you have a separate mongo database, comment out the mongo and nginx sections in the docker compose and omit the last two env variables.