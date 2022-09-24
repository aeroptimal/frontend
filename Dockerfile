# build environment
FROM node:16.14.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# docker build -t andres64372/aeroptimal --build-arg BACKEND_HOST=http://localhost/api . 
ARG BACKEND_HOST=http://localhost:8000

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN echo "REACT_APP_BACKEND_HOST=$BACKEND_HOST" >> .env
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]