FROM node:16-alpine3.15

WORKDIR /app

COPY ./apps/front/package*.json /app

RUN npm install

COPY ./apps/front /app/

EXPOSE ${FRONT_PORT}

CMD ["npm", "run", "dev"]