FROM node:14-alpine as build
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest as prod
RUN mkdir app
WORKDIR /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]