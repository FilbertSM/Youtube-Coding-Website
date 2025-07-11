import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: String,
  comment: String,
  timestamp: { type: Date, default: Date.now }
});

const CardSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  content: String,
  authors: [String],
  tags: [String],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  thumbnail: String,
  duration: String,
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Card", CardSchema);