const notes = require('../controllers/note.controller.js'); 

module.exports = (router) => {
    
    router.post('/notes', notes.create);

    router.get('/notes', notes.findAll);

    router.get('/notes/:id', notes.findOne);

    router.put('/notes/:id', notes.update);

    router.delete('/notes/:id', notes.delete);

}