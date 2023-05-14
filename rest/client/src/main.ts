import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4001" });

async function main() {
  const greeting = await client
    .get("greeting", {
      params: { name: "Tran" },
    })
    .then((res) => res.data);
  console.log("greeting", greeting);

  const users = await Promise.all([
    client.get("users/byId", { params: { id: "1" } }).then((res) => res.data),
    client.get("users/byId", { params: { id: "2" } }).then((res) => res.data),
  ]);
  console.log("users", users);

  const newUser = await client
    .post("users/create", { name: "John", age: 27 })
    .then((res) => res.data);
  console.log("newUser", newUser);
}

main();
