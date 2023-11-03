
const multer = require("multer");
module.exports = (router) => {

    const post = require("../controllers/post.controller");

    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "uploads");
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() +'-'+file.originalname);
        }
    });
    var upload = multer({ storage:storage });

    router.post("/post", upload.single('image'), post.create);

    router.get("/post", post.findAll);

    router.get("/post/:id", post.findOne);

    router.put("/post/:id", post.update);

    router.delete("/post/:id", post.delete);

}