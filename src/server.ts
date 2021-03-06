/// <reference types="vite/client" />
import * as trpcExpress from '@trpc/server/adapters/express'
import express from "express";
import httpDevServer from "vavite/http-dev-server";

const app = express();

app.use((req, _res, next) => {
  // request logger
  console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

  next();
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get('/', (_req, res) => res.send('hellooo!'));


if (httpDevServer) {
	httpDevServer.on("request", app);
} else {
	console.log("Starting prod server");
	app.listen(3334);
}