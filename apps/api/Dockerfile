FROM node:16-alpine3.15 As development

WORKDIR /app

RUN npm install -g @nestjs/cli 

COPY ./apps/api/package*.json /app

RUN npm install

COPY ./apps/api /app

EXPOSE ${API_PORT}

CMD ["npm", "run", "start:dev"]

FROM node:16-alpine3.15 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN npm install -g @nestjs/cli 

COPY ./apps/api/package*.json /app

RUN npm ci

COPY ./apps/api /app

RUN npm run build

COPY --from=development /app/dist ./dist

CMD ["npm", "run", "start:prod"]