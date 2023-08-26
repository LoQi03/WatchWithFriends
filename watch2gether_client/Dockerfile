# pull official base image
FROM node:18.16.1-buster-slim as build

# set working directory
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
RUN npm run build

# nginx Web Server
FROM nginx:1.21.3-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]