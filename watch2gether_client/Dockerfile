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

# Use serve to serve the build output
RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]
