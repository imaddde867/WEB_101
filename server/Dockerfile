FROM denoland/deno:alpine-2.3.3

WORKDIR /app

COPY deno.json .

RUN DENO_FUTURE=1 deno install

COPY . .

CMD [ "run", "--allow-env", "--allow-net", "--watch", "app-run.js" ]