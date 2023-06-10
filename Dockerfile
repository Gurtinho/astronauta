FROM node
WORKDIR /usr/app
COPY package.json ./
COPY . .
RUN npm install
CMD ["npm", "run", "bot"]