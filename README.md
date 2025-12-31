# [kuvii's personal site](https://kuvii.me/)

this beautiful little thing is built on top of nuxt4

## requirements
- nodejs
- pnpm
- docker

## install dependencies
```sh
pnpm i
```

## run a dev server
```sh
pnpm run dev
```

## build it
```sh
docker built -d site .
```

## run a prod container
compose.yml
```
services:
  site:
    image: site:latest
    ports:
    - "3000:3000"
    # using a reverse proxy like caddy is recommended
```

```sh
docker compose up -d
```
