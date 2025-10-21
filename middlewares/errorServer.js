function errorsHandler(err, req, res, next) {
    
    res.status(500)
    res.json({
        error: 'Errore 500',
        message: 'Errore generico'
    });
};

module.exports = errorsHandler;