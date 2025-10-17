const articoli = require('../data/articoli');

// GET /posts
function index(req, res) {
  res.json(articoli);
}

// GET /posts/:id
function show(req, res) {
  const id = Number(req.params.id);
  const articolo = articoli.find(p => p.id === id);
  if (!articolo) return res.status(404).json({ error: 'Post non trovato' });
  res.json(articolo);
}

// POST /posts 
function store(req, res) {
  res.send('Creazione nuovo post');
}

// PUT /posts/:id 
function update(req, res) {
  res.send('Modifica integrale del post ' + req.params.id);
}

// PATCH /posts/:id 
function modify(req, res) {
  res.send('Modifica parziale del post ' + req.params.id);
}

// DELETE /posts/:id —
function destroy(req, res) {
  const id = Number(req.params.id);
  const idx = articoli.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Post non trovato' });

  articoli.splice(idx, 1);
  console.log('Lista post aggiornata:', articoli);
  return res.status(204).send(); // nessun contenuto

  
}

module.exports = { index, show, store, update, modify, destroy };