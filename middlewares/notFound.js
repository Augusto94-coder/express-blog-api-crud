function notFound (req, res, next) {
  res.status(404).json({
    status: 404,
    error: 'Errore 404',
    message: 'Risorsa non trovata'
  });
};

module.exports = notFound;