FROM node:14-alpine
WORKDIR /app
COPY ./ /app
EXPOSE 3000/tcp

CMD yarn install --frozen-lockfile && yarn start:debug
