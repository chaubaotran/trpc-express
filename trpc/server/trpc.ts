import { initTRPC } from "@trpc/server";

// tRPCインスタンスを初期化する
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
