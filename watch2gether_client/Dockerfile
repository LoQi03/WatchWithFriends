FROM node:18.14.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
RUN npm run build --port 11081
COPY . .

RUN npm install -g serve

EXPOSE 11081

CMD ["serve", "-s", "build","--port","11081"]
