const NotesStorage = artifacts.require("NotesStorage");

contract("NotesStorage", (accounts) => {
  let notesStorage;

  before(async () => {
    notesStorage = await NotesStorage.deployed();
  });

  it("should add a note", async () => {
    await notesStorage.addNote("First Note");
    const notes = await notesStorage.getNotes();
    assert.equal(notes[0], "First Note", "The note was not added correctly");
  });

  it("should edit a note", async () => {
    await notesStorage.addNote("Second Note");
    await notesStorage.editNote(1, "Updated Note");
    const notes = await notesStorage.getNotes();
    assert.equal(notes[1], "Updated Note", "The note was not updated correctly");
  });

  it("should delete a note", async () => {
    await notesStorage.addNote("Note to Delete");
    await notesStorage.deleteNote(2);
    const notes = await notesStorage.getNotes();
    assert.equal(notes.length, 2, "The note was not deleted correctly");
  });
});
