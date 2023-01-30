const express = require("express"); // module express framework

const path = require("path"); // module to get path

const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller"); // import addNote from notes controller

const chalk = require("chalk"); // style console.log with chalk
const port = 3000; // create constant for port

const app = express(); // create app object

// change base settings
app.set("view engine", "ejs"); // set template engie to use
app.set("views", "pages"); // where to find views

// configure statis folder to load content inside (ex. scripts)
app.use(express.static(path.resolve(__dirname, "public")));

// allows provide json data to server
app.use(express.json());

// add additional functions to express
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  // res.sendFile(path.join(basePath, "index.html"));
  // file to render
  // parameter
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  const { title } = await req.body;
  await addNote(title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.put("/:id/:note", async (req, res) => {
  await updateNote(req.params.id, req.params.note);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

// start server with listen.
// provide port as first parameter
// provide callback as second parameter:
// callback will exe. if listen was successfull
app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port} ...`));
});
