FROM node:24-alpine AS build
RUN apk add --no-cache sed
WORKDIR /srv
COPY package*.json ./
RUN npm i
COPY . .
RUN sed -i "s/%UPDATED_AT%/$(date +'%Y-%m-%d %H:%M')/g" ./nuxt.config.ts
RUN npm run build

FROM build AS prod
WORKDIR /srv
COPY --from=build /srv/.output ./.output
EXPOSE 3000
CMD ["./.output/server/index.mjs"]

