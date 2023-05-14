import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";

import { appRouter } from "./routers";

// expressモジュールを利用しアプリケーションオブジェクトappを作成
const app = express();

// Contextの設定を行うためにcreateContext関数の作成を行う
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

// ミドルウェアの設定
app.use(cors({ origin: "*" }));

// tprcサーバの設定
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// 4000番のポート設定とサーバの起動
app.listen(4000);
