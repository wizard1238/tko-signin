# tko-signin

two backend devs make a data visualizer


## Normal Config:
Create two env files, one in the root directory of `/backend` and the other in the root directoy of `/frontend`.  
Backend: 
```
SECRET=supersecretsecretsyay
MONGODB=mongodb://localhost:27017/signin
```
Frontend:
```
VUE_APP_API_URL=http://localhost:3000
```

## Docker Config
Create a single `.env` file in the root directory.
```
SECRET=<secret>
MONGODB=<mongodb address>
VUE_APP_API_URL=<api url>
MONGO_INITDB_ROOT_USERNAME=<username>
MONGO_INITDB_ROOT_PASSWORD=<password>
```
The last two env variables are only needed if you want to run mongodb with docker compose. If you have a separate mongo database, comment out the mongo section in the docker compose and omit the last two env variables.