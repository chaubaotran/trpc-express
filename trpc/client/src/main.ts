import { createTRPCProxyClient, httpLink, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/routers";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});

async function main() {
  const greeting = await client.greeting.query({ name: "Tran" });
  console.log("greeting", greeting);

  const users = await Promise.all([
    client.users.getById.query("1"),
    client.users.getById.query("2"),
  ]);
  console.log("users", users);

  const newUser = await client.users.create.mutate({
    name: "John",
    age: 27,
  });
  console.log("newUser", newUser);

  const updateUserAge = await client.users.updateAge.mutate({
    id: "1",
    age: 35,
  });
  console.log("updateUserAge", updateUserAge);

  const allUsers = await client.users.getAll.query();
  console.log("allUsers", allUsers);
}

main();
