FROM node:24-alpine AS build
WORKDIR /srv
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM build AS prod
WORKDIR /srv
RUN sed -i "s/%UPDATED_AT%/$(date +'%Y-%m-%d | %H:%M')/g" ./nuxt.config.ts
COPY --from=build /srv/.output ./.output
EXPOSE 3000
CMD ["./.output/server/index.mjs"]

