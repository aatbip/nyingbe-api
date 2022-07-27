const Notes = require("../model/Notes");
const jwt = require("jsonwebtoken");
const { success, failure } = require("../utils/responseMessage");

const addNote = async (req, res) => {
  const { title, text } = req.body;
  const userId = req.user.userId;

  let newNote = new Notes({
    userId,
    title,
    text,
  });

  await newNote.save();
  return res.status(200).json(success(newNote));
};

const getAllNote = async (req, res) => {
  const userId = req.user.userId;

  const allNote = await Notes.find({ userId: userId });

  res.status(200).json(success(allNote));
};

const getNoteById = async (req, res) => {
  const userId = req.user.userId;

  const { id } = req.params;
  if (userId) {
    const note = await Notes.findById({ _id: id }).sort({ createdAt: 1 });
    res.status(200).json(success(note));
  }
};

const updateNote = async (req, res) => {
  const userId = req.user.userId;

  const { id } = req.params;
  const { title, text } = req.body;

  if (userId) {
    let updatedNote = { title, text };
    updatedNote = await Notes.findByIdAndUpdate(
      id,
      { $set: updatedNote },
      { new: true }
    );

    res.status(200).json(success(updatedNote));
  }
};

const deleteNote = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  console.log(userId); 

  if (userId) {
    await Notes.findByIdAndDelete(id);
    res.status(200).json(success());
  }
};

module.exports = {
  addNote,
  getAllNote,
  getNoteById,
  updateNote,
  deleteNote
};
