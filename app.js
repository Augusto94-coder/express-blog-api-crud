const express = require("express");
const app = express();
const port = 3000;
const postsRouter = require("./routers/posts");

app.use(express.static('public'));

app.use(express.json());

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Registrazione router con prefisso /posts
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Server attivo. Usa /posts");
});

// Catch-all 404 per rotte non registrate
app.use(notFound);

// Gestore errori centrale
app.use(errorHandler);

// Avvio server

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});