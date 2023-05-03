FROM node:18-alpine3.17

RUN mkdir -p /home/node/omgapp/node_modules && chown -R node:node /home/node/omgapp

WORKDIR /home/node/omgapp

COPY package.json ./

USER node

RUN npm i

COPY --chown=node:node . .

EXPOSE 5000
RUN
CMD ["sh","-c", "export NODE_ENV=production && node ./dist/src/run.js"]
