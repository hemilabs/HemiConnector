## -*- docker-image-name: "hemilabs/hemiconnector-metrics:1.0.0" -*-
FROM node:20.16.0-alpine3.20@sha256:eb8101caae9ac02229bd64c024919fe3d4504ff7f329da79ca60a04db08cef52

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install --production
RUN npm run build

CMD [ "npm", "run", "collect-metrics"]
