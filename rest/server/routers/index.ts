import express from "express";

const router = express.Router();

router.get<{ name: string }>("/greeting", (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

export default router;
