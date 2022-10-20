FROM node:16-alpine3.15 As development

WORKDIR /app

COPY ./apps/front/package*.json /app

RUN npm install

COPY ./apps/front /app

EXPOSE ${FRONT_PORT}

CMD ["npm", "run", "dev"]

FROM node:16-alpine3.15 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY ./apps/front/package*.json /app

RUN npm ci

COPY ./apps/front /app

RUN npm run build

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]