# pull official base image
FROM node:14.4.0-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node:10 AS builder

# WORKDIR /app

# COPY . .

# EXPOSE 3000

# CMD npm build

# FROM nginx:alpine

# WORKDIR /usr/share/nginx/html

# COPY --from=builder /app/build .

# CMD ["nginx", "-g", "daemon off;"]