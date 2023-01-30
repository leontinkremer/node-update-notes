const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  console.log(notes);
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function updateNote(id, note) {
  let notes = await getNotes(); // get arr of notes
  console.log("id", id);
  console.log("note", note);
  // let newArr = [];
  notes.forEach((element) => {
    if (element.id === id.toString()) {
      element.title = note;
    }
  });
  console.log(notes); // log notes
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgRed("Note was updated!"));
}

async function removeNote(id) {
  const notes = await getNotes(); // get arr of notes
  let newArr = [];
  notes.forEach((element) => {
    if (element.id !== id.toString()) {
      newArr.push(element);
    }
  });
  console.log(notes); // log notes
  await fs.writeFile(notesPath, JSON.stringify(newArr));
  console.log(chalk.bgRed("Note was removed!"));
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.title));
  });
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
