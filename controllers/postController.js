const articoli = require('../data/articoli');

// GET /posts
function index(req, res) {
  let filteredPosts = articoli;

    
    if (req.query.tag) {
        filteredPosts = articoli.filter(
            post => post.tags.includes(req.query.tag)
        );
    }

    
    res.json(filteredPosts);

}

// GET /posts/:id
function show(req, res) {
  const id = Number(req.params.id);
  const post = articoli.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post non trovato' });
  res.json(post);
}

// POST /posts 
function store(req, res) {
  const newId = articoli[articoli.length - 1].id + 1;

    // Creiamo un nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags 
    };

    // Aggiungiamo il nuovo post
    articoli.push(newPost);

    // Controllo in console (Milestone 2)
    console.log("Nuovo post aggiunto:", newPost);
    console.log("Lista aggiornata:", articoli);

    // Restituiamo la risposta con status 201
    res.status(201);
    res.json(newPost);
}


// PUT /posts/:id 
function update(req, res) {
    // Recuperiamo l'id dall'URL
    const id = parseInt(req.params.id);

    // Cerchiamo il post
    const post = articoli.find(post => post.id === id);

    // Controllo se non esiste
    if (!post) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        });
    }

    // Aggiorniamo completamente i campi
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log("Post aggiornato:", post);
    res.json(post);
}

// MODIFY (PATCH)
function modify(req, res) {
    // Recuperiamo l'id
    const id = parseInt(req.params.id);

    // Cerchiamo il post
    const post = articoli.find(post => post.id === id);

    // Controllo se non esiste
    if (!post) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        });
    }

    // Aggiorniamo solo i campi presenti nella richiesta
    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.content ? post.content = req.body.content : post.content = post.content;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags;

    console.log("Post modificato (PATCH):", post);
    res.json(post);
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