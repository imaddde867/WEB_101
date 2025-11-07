FROM denoland/deno:alpine-2.3.3

WORKDIR /app

COPY . .

RUN DENO_FUTURE=1 deno install

CMD [ "run", "dev", "--host"]