const express = require('express');
const cors = require("cors");
const app = express();

let notes = [
	{
		id : 1, 
		content : "first note",
		important : true
	},
	{
		id : 2, 
		content : "second note",
		important : false
	}
];

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get('/', (req, res) => {
	res.send("Hello World!");
});

app.get('/notes', (req, res) => {
	res.json(notes);
});

app.get('/notes/:id', (req, res) => {
	const id = Number(req.params.id);
	const note = notes.find(note => note.id === id);
	if (note)
		res.json(note);
	else
		res.status(404).end();
});

app.delete('/notes/:id', (req, res) => {
	const id = Number(req.params.id);
	notes = notes.filter(note => note.id !== id);
	res.status(204).end();
});

app.post('/notes', (req, res) => {
	const reqNote = req.body;
	console.log(reqNote);

	if (!reqNote.content) {
		return res.status(400).json({
			"error" : "note contains no content"
		});
	}

	const newNote = {
		content : reqNote.content,
		important : reqNote.important || false
	};

	newNote.id = notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 0;

	notes = notes.concat(newNote);

	res.json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
