document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      const elem = document.getElementById(`li-${id}`);
      console.log("elem", elem);
      elem.remove();
    });
  }
});

// subtask: continue working here
document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const editId = event.target.dataset.id;
    const newNote = prompt("Please enter the new note");
    const id = editId.slice(5);
    const param = `${id}/${newNote}`;
    update(param).then(() => {
      let note = document
        .querySelector(`[data-id=${editId}]`)
        .parentElement.getElementsByTagName("span")[0];
      note.innerText = newNote;
      //   console.log("editId", editId);
      //   console.log("note", note);
    });
  }
});

async function update(id) {
  await fetch(`/${id}`, {
    method: "PUT",
  });
}

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}
