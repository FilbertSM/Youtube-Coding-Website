import express from "express";
import Card from "../models/Card.js";
const router = express.Router();

// GET /api/cards (with pagination and search)
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  const query = req.query.title
    ? { title: { $regex: req.query.title, $options: "i" } }
    : {};
  const cards = await Card.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
  res.json({ cards });
});

// GET /api/cards/:id
router.get("/:id", async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) return res.status(404).json({ error: "Not found" });
  res.json(card);
});

// POST /api/cards
router.post("/", async (req, res) => {
  const card = new Card(req.body);
  await card.save();
  res.status(201).json(card);
});

// PUT /api/cards/:id
router.put("/:id", async (req, res) => {
  const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!card) return res.status(404).json({ error: "Not found" });
  res.json(card);
});

// DELETE /api/cards/:id
router.delete("/:id", async (req, res) => {
  const card = await Card.findByIdAndDelete(req.params.id);
  if (!card) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;