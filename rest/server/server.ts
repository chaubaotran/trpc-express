import express from "express";
import cors from "cors";

import indexRouter from "./routers/index";
import userRouter from "./routers/users";

// expressモジュールを利用しアプリケーションオブジェクトappを作成
const app = express();

// ミドルウェアの設定
app.use(cors({ origin: "*" }));
app.use(express.json());

// ルータの設定
app.use("/", indexRouter);
app.use("/users", userRouter);

// 4001番のポート設定とサーバの起動
app.listen(4001);
