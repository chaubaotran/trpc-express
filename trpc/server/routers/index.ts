import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { usersRouter } from "./users";

export const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query((opts) => {
      return `Hello ${opts.input.name}`;
    }),
  users: usersRouter,
});

// type AppRouterをexportする
export type AppRouter = typeof appRouter;
