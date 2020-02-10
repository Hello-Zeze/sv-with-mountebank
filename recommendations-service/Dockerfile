FROM node:carbon as build
ADD . /app
WORKDIR /app
RUN npm install 

FROM node:carbon
COPY --from=build /app /app
WORKDIR /app
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]