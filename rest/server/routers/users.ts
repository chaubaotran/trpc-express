import { randomUUID } from "crypto";
import express from "express";

type User = {
  id: string;
  name: string;
  age: number;
};

const USERS: User[] = [
  { id: "1", name: "Anna", age: 25 },
  { id: "2", name: "Bob", age: 30 },
];

const router = express.Router();

router.get<{ id: string }>("/byId", (req, res) => {
  res.json(USERS.find((user) => user.id === req.query.id));
});

router.post<{ name: string; age: number }>("/create", (req, res) => {
  const { name, age } = req.body;
  const user: User = { id: randomUUID(), name, age };
  USERS.push(user);
  res.json(user);
});

export default router;
