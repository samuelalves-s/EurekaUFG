FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build-stage /app ./
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host"]