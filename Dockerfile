FROM node:24-alpine AS build
WORKDIR /srv
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM prod
WORKDIR /srv
COPY --from=build /srv/.output ./.output
EXPOSE 3000
CMD ["./server/index.mjs"]
