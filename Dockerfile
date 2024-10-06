FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm install -g npm
RUN chown -R node /usr/src/app
EXPOSE 5514/udp
CMD ["node", "start.js"]
