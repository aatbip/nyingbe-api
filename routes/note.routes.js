const express = require("express");
const {
  addNote,
  getAllNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const { verifyUser } = require("../middleware/verifyUser");

const router = express.Router();

router.post("/addnote", verifyUser, addNote);
router.get("/getnotes", verifyUser, getAllNote);
router.get("/:id", verifyUser, getNoteById);
router.patch("/updatenote/:id", verifyUser, updateNote);
router.delete("/:id", verifyUser, deleteNote);

module.exports = router;
