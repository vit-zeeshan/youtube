# Build stage
FROM node:current-alpine AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
