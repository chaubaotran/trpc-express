import { z } from "zod";
import { randomUUID } from "crypto";

import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

type User = {
  id: string;
  name: string;
  age: number;
};

const USERS: User[] = [
  { id: "1", name: "Anna", age: 25 },
  { id: "2", name: "Bob", age: 30 },
];

export const usersRouter = router({
  getById: publicProcedure.input(z.string()).query((opts) => {
    return USERS.find((user) => user.id === opts.input);
  }),
  create: publicProcedure
    .input(z.object({ name: z.string(), age: z.number() }))
    .mutation((opts) => {
      const { name, age } = opts.input;
      const user: User = { id: randomUUID(), name, age };
      USERS.push(user);
      return user;
    }),

  getAll: publicProcedure.query((opts) => {
    return USERS;
  }),

  updateAge: publicProcedure
    .input(z.object({ id: z.string(), age: z.number() }))
    .mutation((opts) => {
      const { id, age } = opts.input;
      const user = USERS.find((user) => user.id === id);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      user.age = age;
      return user;
    }),
});
