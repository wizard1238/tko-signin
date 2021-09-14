FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN apk add python make gcc g++ pkgconfig pixman-dev
# RUN apk --no-cache add ca-certificates wget  && \
#     wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
#     wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
#     apk add glibc-2.29-r0.apk && \
#     yarn add canvas@2.5.0;
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]
