import { notesData } from './notesData.js';

class NoteApp extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <note-header></note-header>
            <main>
                <note-form></note-form>
                <div class="notes-container"></div>
            </main>
        `;
    }
}

class NoteHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <header>
                <h1>NoteApp</h1>
            </header>
        `;
    }
}

class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <form id="note-form">
                <input type="text" id="title" placeholder="Judul Catatan" required>
                <textarea id="body" placeholder="Isi Catatan" required></textarea>
                <button type="submit">Tambah Catatan</button>
            </form>
        `;
        this.querySelector("form").addEventListener("submit", this.addNote.bind(this));
    }
    addNote(event) {
        event.preventDefault();
        const title = this.querySelector("#title").value;
        const body = this.querySelector("#body").value;
        document.querySelector(".notes-container").appendChild(new NoteCard(title, body));
        this.querySelector("form").reset();
    }
}


class NoteCard extends HTMLElement {
    constructor(title, body) {
        super();
        this.innerHTML = `
            <div class="note-card">
                <h3>${title}</h3>
                <p>${body}</p>
            </div>
        `;
    }
}

customElements.define("note-app", NoteApp);
customElements.define("note-header", NoteHeader);
customElements.define("note-form", NoteForm);
customElements.define("note-card", NoteCard);

const notesContainer = document.querySelector(".notes-container");
notesData.forEach(note => {
    notesContainer.appendChild(new NoteCard(note.title, note.body));
});
