FROM node:18.14.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
COPY . .

RUN npm install -g serve

EXPOSE 6000

CMD ["serve", "-s", "build", "-l", "6000"]
