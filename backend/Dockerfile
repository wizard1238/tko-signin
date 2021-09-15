from ubuntu:latest
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN apt update
RUN DEBIAN_FRONTEND="noninteractive"  TZ="America/Los_Angeles" apt install -y tzdata
RUN apt install -y nodejs npm curl
RUN npm install -g n
RUN n stable
RUN npm install -g yarn
RUN yarn
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]