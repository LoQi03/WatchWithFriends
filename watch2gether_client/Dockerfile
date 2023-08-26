# pull official base image
FROM node:18.16.1-buster-slim as build

# set working directory
WORKDIR /app
COPY . .
RUN npm install
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

# start app
CMD ["serve", "-s", "build", "-l", "3000"]