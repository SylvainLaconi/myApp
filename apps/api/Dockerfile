FROM node:16-alpine3.15

WORKDIR /app

RUN npm install -g @nestjs/cli 

COPY ./apps/api/package*.json /app/

RUN npm install

COPY ./apps/api /app/

RUN npm run build

EXPOSE ${API_PORT}

CMD ["npm", "run", "start:dev"]